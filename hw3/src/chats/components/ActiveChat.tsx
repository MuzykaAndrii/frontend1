import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import MessageComponent from './Message';
import MessageInputComponent from './MessageInput';
import { useAuth } from '../../auth/context';


export default function ActiveChatComponent({ chatId }) {
    const auth = useAuth();
    const chats = useSelector(state => state.chats.chats);
    // i need this here because chats loads asynchronously, i.e. the parent component
    // cant download current chat faster than current messages displays
    const [isLoading, setIsLoading] = useState(true);
    const messages = chats[chatId]?.messages || [];

    useEffect(() => {
        if (chats[chatId]) {
            setIsLoading(false);
        }
    }, [chats, chatId]);


    if (isLoading) {
        return <div>Loading chat...</div>;
    }

    return <>
        <div className="chat-messages flex-grow-1 overflow-auto py-4">
            {messages.map((msg, index) => (
                <MessageComponent
                    key={index}
                    message={msg.message}
                    sent_at={msg.sent_at}
                    from_user_username={msg.from_user_username}
                    from_user_id={msg.from_user_id}
                    current_user={auth.currentUser}
                />
            ))}
        </div>

        <div className="row g-3 sendMsgArea p-3">
            <MessageInputComponent chatId={chatId} />
        </div>
    </>
}