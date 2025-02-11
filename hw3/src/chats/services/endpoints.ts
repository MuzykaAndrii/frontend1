import { ChatEndpoints, WSEndpoints } from '../types';

export const apiEndpoints: ChatEndpoints = {
    host: "127.0.0.1",
    port: "8000",

    get backendUrl() {
        return `http://${this.host}:${this.port}`;
    },

    get chatsListUrl() {
        return `${this.backendUrl}/api/chatrooms/`;
    },

    get myChatsListUrl() {
        return `${this.backendUrl}/api/chatrooms/my/`;
    }
};

export const wsEndpoints: WSEndpoints = {
    host: "127.0.0.1",
    port: "5000",

    get backendUrl() {
        return `ws://${this.host}:${this.port}`;
    },

    getChatUrl(roomId: number) {
        return `${this.backendUrl}/ws/chatrooms/${roomId}/`;
    }
};