class Auth {
    constructor(authStorage, endpoints) {
        this._authStorage = authStorage;
        this._endpoints = endpoints;
    }

    async _request(url, data, method = "POST", includeAuth = false) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (includeAuth) {
            const authHeader = this._authStorage.getAuthData().getHeader()
            Object.assign(headers, authHeader);
        }

        const options = {
            method,
            headers
        };

        if (method !== "GET") {
            options.body = JSON.stringify(data);
        }

        return await fetch(url, options);
    }

    getAuthData() {
        return this._authStorage.getAuthData();
    }

    async request(url, data, method = "POST") {
        let response = await this._request(url, data, method, true);

        if (response.status === 401) {
            try {
                await this._refresh_access_token();
                response = await this._request(url, data, method, true);
            } catch (error) {
                throw new Error("Authentication failed. Please log in again.");
            }
        }
        let res = await response.json();
        return res;
    }

    async _refresh_access_token() {
        let response = await this._request(
            this._endpoints.refreshEndpoint,
            { refresh: this._authStorage.getRefreshToken() },
            "POST"
        );

        if (response.status !== 200) {
            throw new Error("Not authenticated.");
        }

        let data = await response.json();
        this._authStorage.setAccessToken(data.access);
    }

    getCurrentUser() {
        return this._authStorage.getCurrentUser();
    }

    async login_user(username, password) {
        let response = await this._request(this._endpoints.loginEndpoint, { username, password });
        if (response.status !== 200) {
            throw new Error("Bad credentials");
        }

        let data = await response.json();
        this._authStorage.saveUser(data);
    }

    async logout_user() {
        await this._request(this._endpoints.logoutEndpoint, this._authStorage.processLogout());
    }

    async register_user(username, email, password) {
        let response = await this._request(this._endpoints.registerEndpoint, { username, email, password });
        let data = await response.json();

        if (response.status !== 200) {
            throw new Error(JSON.stringify(data));
        }
        return data;
    }
}

export default Auth;
