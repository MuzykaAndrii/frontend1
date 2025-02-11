export interface User {
    user_id: number;
    username: string;
    email?: string;
    exp?: number;
    iat?: number;
}

export interface AuthCredentials {
    access: string;
    refresh: string;
}

export interface AuthData {
    name: string;
    headerPrefix: string;
    token: string | null;
    getHeader(): { [key: string]: string };
}

export interface AuthEndpoints {
    host: string;
    port: string;
    backendUrl: string;
    loginEndpoint: string;
    logoutEndpoint: string;
    registerEndpoint: string;
    refreshEndpoint: string;
}

export interface AuthContextType {
    currentUser: User | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    request: <T>(url: string, data?: any, method?: string) => Promise<T>;
    getAuthData: () => AuthData;
}