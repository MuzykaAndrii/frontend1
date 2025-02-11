import { AuthCredentials, AuthData, AuthEndpoints, User } from '../types';
import JwtStorage from "./authStorage";

class Auth {
    private _authStorage: typeof JwtStorage;
    private _endpoints: AuthEndpoints;

    constructor(authStorage: typeof JwtStorage, endpoints: AuthEndpoints) {
        this._authStorage = authStorage;
        this._endpoints = endpoints;
    }

    private async _request(
        url: string,
        data?: any,
        method: string = "POST",
        includeAuth: boolean = false
    ): Promise<Response> {
        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (includeAuth) {
            const authHeader = this._authStorage.getAuthData().getHeader();
            Object.assign(headers, authHeader);
        }

        const options: RequestInit = {
            method,
            headers
        };

        if (method !== "GET" && data) {
            options.body = JSON.stringify(data);
        }

        return await fetch(url, options);
    }

    getAuthData(): AuthData {
        return this._authStorage.getAuthData();
    }

    async request<T>(url: string, data?: any, method: string = "POST"): Promise<T> {
        let response = await this._request(url, data, method, true);

        if (response.status === 401) {
            try {
                await this._refresh_access_token();
                response = await this._request(url, data, method, true);
            } catch (error) {
                throw new Error("Authentication failed. Please log in again.");
            }
        }
        return await response.json() as T;
    }

    private async _refresh_access_token(): Promise<void> {
        const response = await this._request(
            this._endpoints.refreshEndpoint,
            { refresh: this._authStorage.getRefreshToken() },
            "POST"
        );

        if (response.status !== 200) {
            throw new Error("Not authenticated.");
        }

        const data = await response.json() as AuthCredentials;
        this._authStorage.setAccessToken(data.access);
    }

    getCurrentUser(): User | null {
        return this._authStorage.getCurrentUser();
    }

    async login_user(username: string, password: string): Promise<void> {
        const response = await this._request(this._endpoints.loginEndpoint, { username, password });
        if (response.status !== 200) {
            throw new Error("Bad credentials");
        }

        const data = await response.json() as AuthCredentials;
        this._authStorage.saveUser(data);
    }

    async logout_user(): Promise<void> {
        await this._request(this._endpoints.logoutEndpoint, this._authStorage.processLogout());
    }

    async register_user(username: string, email: string, password: string): Promise<any> {
        const response = await this._request(
            this._endpoints.registerEndpoint,
            { username, email, password }
        );
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error(JSON.stringify(data));
        }
        return data;
    }
}

export default Auth;
