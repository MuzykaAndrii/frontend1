import { createContext, useContext } from 'react';

export const ChatServiceContext = createContext(null);

export const useChatServices = () => {
    return useContext(ChatServiceContext);
};