import { AuthContextType } from '../../auth/types';
import { Message, MessageHandler } from '../types';


export default class WebSocketService {
    private auth: AuthContextType;
    private connections: Map<string, WebSocket>;
    private messageHandler: MessageHandler | null;

    constructor(auth: AuthContextType) {
        this.auth = auth;
        this.connections = new Map();
        this.messageHandler = null;
    }

    setMessageHandler(handler: MessageHandler): void {
        this.messageHandler = handler;
    }

    connect(chatId: number, socketUrl: URL): void {
        const chatIdStr = chatId.toString();
        if (this.connections.has(chatIdStr)) {
            return;
        }

        socketUrl.searchParams.append('token', this.auth.getAuthData().token || '');
        const ws = new WebSocket(socketUrl.toString());

        ws.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data) as Message;
            if (this.messageHandler) {
                this.messageHandler(message, chatId);
            }
        };

        ws.onopen = () => {
            console.log(`WebSocket connection established for chat ${chatId}`);
        };

        ws.onerror = (error: Event) => {
            console.error(`WebSocket error for chat ${chatId}:`, error);
        };

        ws.onclose = () => {
            console.log(`WebSocket connection closed for chat ${chatId}`);
            this.connections.delete(chatIdStr);
        };

        this.connections.set(chatIdStr, ws);
    }

    disconnect(chatId: number): void {
        const chatIdStr = chatId.toString();
        const ws = this.connections.get(chatIdStr);
        if (ws) {
            ws.close();
            this.connections.delete(chatIdStr);
        }
    }

    disconnectAll(): void {
        this.connections.forEach((_, chatId) => {
            this.disconnect(Number(chatId));
        });
    }
}