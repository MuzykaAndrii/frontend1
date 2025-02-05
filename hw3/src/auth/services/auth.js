class Auth {
    constructor(authStorage, endpoints) {
        this._authStorage = authStorage;
        this._endpoints = endpoints;
    }

    async _request(url, data) {
        return await fetch(
            url,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }
        )
    };

    async login_user(username, password) {
        let response = await this._request(this._endpoints.loginEndpoint, {
            username: username,
            password: password,
        });

        if (response.status != 200) {
            throw "Bad credentials";
        }

        let resp = await response.json();
        this._authStorage.saveUser(resp);
    };


    // async logout_user() {
    //     return await this._request(
    //         this._endpoints.logoutEndpoint,
    //         {
    //             access: access_token,
    //             refresh: refresh_token,
    //         }
    //     );
    // }


    async register_user(username, email, password) {
        let response = await this._request(
            this._endpoints.registerEndpoint,
            {
                username: username,
                email: email,
                password: password,
            }
        );

        let data = await response.json();

        if (response.status != 200) {
            throw JSON.stringify(data);
        }
        return data;
    }
}

export default Auth;