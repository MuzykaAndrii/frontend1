export default class WebSocketService {
    constructor(auth) {
        this.auth = auth;
        this.connections = new Map();
        this.messageHandlers = new Set();
    }

    addMessageHandler(handler) {
        this.messageHandlers.add(handler);
        return () => this.messageHandlers.delete(handler);
    }

    connect(chatId, socketUrl) {
        if (this.connections.has(chatId)) {
            return;
        }

        socketUrl.searchParams.append('token', this.auth.getAuthData().token);
        const ws = new WebSocket(socketUrl.toString());

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.messageHandlers.forEach(handler => handler(message, chatId));
        };

        ws.onopen = () => {
            console.log(`WebSocket connection established for chat ${chatId}`);
        };

        ws.onerror = (error) => {
            console.error(`WebSocket error for chat ${chatId}:`, error);
        };

        ws.onclose = () => {
            console.log(`WebSocket connection closed for chat ${chatId}`);
            this.connections.delete(chatId);
        };

        this.connections.set(chatId, ws);
    }

    disconnect(chatId) {
        const ws = this.connections.get(chatId);
        if (ws) {
            ws.close();
            this.connections.delete(chatId);
        }
    }

    disconnectAll() {
        this.connections.forEach((ws, chatId) => {
            this.disconnect(chatId);
        });
    }
}