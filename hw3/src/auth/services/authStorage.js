class JwtStorage {
    static saveUser(creds) {
        sessionStorage.setItem("access_token", creds.access);
        sessionStorage.setItem("refresh_token", creds.refresh);
    }

    static getAccessToken() {
        return sessionStorage.getItem("access_token");
    }

    static getRefreshToken() {
        return sessionStorage.getItem("refresh_token");
    }

    static processLogout() {
        let access = this.getAccessToken()
        let refresh = this.getRefreshToken()
        this.deleteCurrentUser()

        return {
            access: access,
            refresh: refresh
        }
    }

    static deleteCurrentUser() {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
    }

    static _decodeJwt(token) {
        return JSON.parse(atob(token.split('.')[1]));
    }

    static getCurrentUser() {
        let accessToken = this.getAccessToken();
        return accessToken ? this._decodeJwt(accessToken) : null;
    }
}

export default JwtStorage;