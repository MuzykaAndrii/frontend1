const Endpoints = {
    host: "127.0.0.1",
    port: "8000",

    get backendUrl() {
        return `http://${this.host}:${this.port}`;
    },

    get loginEndpoint() {
        return `${this.backendUrl}/api/auth/login/`;
    },

    get logoutEndpoint() {
        return `${this.backendUrl}/api/auth/logout/`;
    },

    get registerEndpoint() {
        return `${this.backendUrl}/api/auth/signup/`;
    }
};

export default Endpoints;