import { useEffect, useState } from "react";

import MessageComponent from './Message';
import { useAuth } from '../../auth/context';


export default function ActiveChatComponent({ chatId }) {
    const auth = useAuth();
    const [messages, setMessages] = useState([]);
    const authHeader = auth.getAuthHeader();

    useEffect(() => {
        if (!chatId) return;

        const socketUrl = new URL(`ws://127.0.0.1:5000/ws/chatrooms/${chatId}/`);
        socketUrl.searchParams.append('token', authHeader.data);

        const socket = new WebSocket(socketUrl.toString());

        socket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            socket.close();
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
            <div className="col-11">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
            </div>
            <div className="col-1">
                <button type="submit" className="btn btn-primary mb-3">Send</button>
            </div>
        </div>

    </>
}