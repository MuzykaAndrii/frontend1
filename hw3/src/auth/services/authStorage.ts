import { AuthCredentials, AuthData, User } from '../types';

class JwtStorage {
    static saveUser(creds: AuthCredentials): void {
        sessionStorage.setItem("access_token", creds.access);
        sessionStorage.setItem("refresh_token", creds.refresh);
    }

    static getAccessToken(): string | null {
        return sessionStorage.getItem("access_token");
    }

    static setAccessToken(token: string): void {
        sessionStorage.setItem("access_token", token);
    }

    static getRefreshToken(): string | null {
        return sessionStorage.getItem("refresh_token");
    }

    static processLogout(): AuthCredentials {
        const access = this.getAccessToken();
        const refresh = this.getRefreshToken();
        this.deleteCurrentUser();

        return {
            access: access || '',
            refresh: refresh || ''
        };
    }

    static deleteCurrentUser(): void {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
    }

    private static _decodeJwt(token: string): User {
        return JSON.parse(atob(token.split('.')[1]));
    }

    static getCurrentUser(): User | null {
        const accessToken = this.getAccessToken();
        return accessToken ? this._decodeJwt(accessToken) : null;
    }

    static getAuthData(): AuthData {
        return {
            name: "Authorization",
            headerPrefix: "Bearer",
            token: this.getAccessToken(),

            getHeader() {
                return {
                    [this.name]: `${this.headerPrefix} ${this.token}`
                };
            }
        };
    }
}

export default JwtStorage;