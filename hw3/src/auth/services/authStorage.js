class JwtStorage {
    static saveUser(creds) {
        sessionStorage.setItem("access_token", creds.access);
        sessionStorage.setItem("access_refresh", creds.refresh);
    }

    static getAccessToken() {
        return sessionStorage.getItem("access_token");
    }

    static getRefreshToken() {
        return sessionStorage.getItem("refresh_token");
    }

    static deleteTokens() {
        sessionStorage.clear();
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