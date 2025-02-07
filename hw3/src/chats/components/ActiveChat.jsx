import { useEffect, useState, useRef } from "react";

import MessageComponent from './Message';
import MessageInputComponent from './MessageInput';
import { useAuth } from '../../auth/context';
import { wsEndpoints } from "../services/endpoints";


export default function ActiveChatComponent({ chatId }) {
    const auth = useAuth();
    const [messages, setMessages] = useState([]);
    const authData = auth.getAuthData();
    const ws = useRef(null);

    useEffect(() => {
        if (!chatId) return;

        const socketUrl = new URL(wsEndpoints.getChatUrl(chatId));
        socketUrl.searchParams.append('token', authData.token);

        ws.current = new WebSocket(socketUrl.toString());

        ws.current.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
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
    }, [chatId, auth]);

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