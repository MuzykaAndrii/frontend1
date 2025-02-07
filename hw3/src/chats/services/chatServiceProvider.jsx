import { useRef } from 'react';
import { useAuth } from '../../auth/context';
import ChatApiService from './chatApi';
import { apiEndpoints, wsEndpoints } from './endpoints';
import { ChatServiceContext } from '../context';


export function ChatServiceProvider({ children }) {
    const auth = useAuth();
    const serviceRef = useRef({
        api: new ChatApiService(auth, apiEndpoints),
    });

    return (
        <ChatServiceContext.Provider value={serviceRef.current}>
            {children}
        </ChatServiceContext.Provider>
    );
}

