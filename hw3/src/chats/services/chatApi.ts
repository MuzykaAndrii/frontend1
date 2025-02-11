import { AuthContextType } from '../../auth/types';
import { Chat, ChatEndpoints } from '../types';

export default class ChatApiService {
    private authClient: AuthContextType;
    private endpoints: ChatEndpoints;

    constructor(authClient: AuthContextType, endpoints: ChatEndpoints) {
        this.authClient = authClient;
        this.endpoints = endpoints;
    }

    async listChats(): Promise<Chat[]> {
        try {
            return await this.authClient.request<Chat[]>(this.endpoints.chatsListUrl, {}, "GET");
        } catch (error) {
            throw new Error(`Failed to fetch chats: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async listMyChats(): Promise<Chat[]> {
        try {
            return await this.authClient.request<Chat[]>(this.endpoints.myChatsListUrl, {}, "GET");
        } catch (error) {
            throw new Error(`Failed to fetch chats: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}