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
            headers["Authorization"] = `Bearer ${this._authStorage.getAccessToken()}`;
        }

        return await fetch(url, {
            method,
            headers,
            body: JSON.stringify(data),
        });
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

        return response;
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
