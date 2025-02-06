const Endpoints = {
    host: "127.0.0.1",
    port: "8000",

    get backendUrl() {
        return `http://${this.host}:${this.port}`;
    },

    get chatsListUrl() {
        return `${this.backendUrl}/api/chatrooms/`
    }
};

export default Endpoints;