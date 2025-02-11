import { useRef, ReactNode } from 'react';
import { useAuth } from '../../auth/context';
import ChatApiService from './chatApi';
import WebSocketService from './chatWs';
import { apiEndpoints } from './endpoints';
import { ChatServiceContext } from '../context';
import { ChatServiceContext as ChatServiceContextType } from '../types';

interface ChatServiceProviderProps {
    children: ReactNode;
}

export function ChatServiceProvider({ children }: ChatServiceProviderProps) {
    const auth = useAuth();
    const serviceRef = useRef<ChatServiceContextType>({
        ws: new WebSocketService(auth),
        api: new ChatApiService(auth, apiEndpoints),
    });

    return (
        <ChatServiceContext.Provider value={serviceRef.current}>
            {children}
        </ChatServiceContext.Provider>
    );
}