export default class ChatApiService {
    constructor(authClient, endpoints) {
        this.authClient = authClient;
        this.endpoints = endpoints;
    }

    async listChats() {
        try {
            return await this.authClient.request(this.endpoints.chatsListUrl, {}, "GET");
        } catch (error) {
            throw new Error(`Failed to fetch chats: ${error.message}`);
        }
    }
}