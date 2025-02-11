import { createContext, useContext } from 'react';
import { ChatServiceContext as ChatServiceContextType } from "./types";

export const ChatServiceContext = createContext<ChatServiceContextType | null>(null);

export const useChatServices = (): ChatServiceContextType => {
    const context = useContext(ChatServiceContext);

    if (!context) {
        throw new Error('useChatServices must be used within an chatServiceProvider');
    }
    return context;
};