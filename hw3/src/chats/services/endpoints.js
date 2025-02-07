export const apiEndpoints = {
    host: "127.0.0.1",
    port: "8000",

    get backendUrl() {
        return `http://${this.host}:${this.port}`;
    },

    get chatsListUrl() {
        return `${this.backendUrl}/api/chatrooms/`;
    }
};


export const wsEndpoints = {
    host: "127.0.0.1",
    port: "5000",

    get backendUrl() {
        return `ws://${this.host}:${this.port}`
    },

    getChatUrl(roomId) {
        return `${this.backendUrl}/ws/chatrooms/${roomId}/`
    }
};