import ChatApiService from "./services/chatApi";
import WebSocketService from "./services/chatWs";

export interface Message {
    message: string;
    sent_at: string;
    from_user_id: number;
    from_user_username: string;
}

export interface Chat {
    id: number;
    name: string;
    messages: Message[];
}

export interface ChatsState {
    chats: Record<number, Chat>;
    loading: boolean;
    error: string | null;
}

export interface ChatServiceContext {
    ws: WebSocketService;
    api: ChatApiService;
}

export interface ChatEndpoints {
    host: string;
    port: string;
    backendUrl: string;
    chatsListUrl: string;
    myChatsListUrl: string;
}

export interface WSEndpoints {
    host: string;
    port: string;
    backendUrl: string;
    getChatUrl: (roomId: number) => string;
}

export interface MessageHandler {
    (message: Message, chatId: number): void;
}