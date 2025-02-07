import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import MessageComponent from './Message';
import MessageInputComponent from './MessageInput';
import { useAuth } from '../../auth/context';
import { wsEndpoints } from "../services/endpoints";
import { addMessage } from '../slices';


export default function ActiveChatComponent({ chatId }) {
    const dispatch = useDispatch();
    const auth = useAuth();
    const chats = useSelector(state => state.chats);
    // i need this here because chats loads asynchronously, i.e. the parent component
    // cant download current chat faster than current messages displays
    const [isLoading, setIsLoading] = useState(true);
    const messages = chats[chatId]?.messages || [];
    const authData = auth.getAuthData();
    const ws = useRef(null);

    useEffect(() => {
        if (chats[chatId]) {
            setIsLoading(false);
        }
    }, [chats, chatId]);

    useEffect(() => {
        if (!chatId || isLoading) return;

        const socketUrl = new URL(wsEndpoints.getChatUrl(chatId));
        socketUrl.searchParams.append('token', authData.token);

        ws.current = new WebSocket(socketUrl.toString());

        ws.current.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            dispatch(addMessage({ message: newMessage, chatId: chatId }));
        };

        ws.current.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            if (ws.current) ws.current.close();
        };
    }, [chatId, auth, isLoading]);

    if (isLoading) {
        return <div>Loading chat...</div>;
    }

    return <>
        <div className="chatHistory flex-grow-1 overflow-auto p-3">
            {messages.map((msg, index) => (
                <MessageComponent
                    key={index}
                    message={msg.message}
                    sent_at={msg.sent_at}
                    from_user_username={msg.from_user_username}
                    from_user_id={msg.from_user_id}
                />
            ))}
        </div>

        <div className="row g-3 sendMsgArea p-3">
            <MessageInputComponent ws={ws} />
        </div>
    </>
}