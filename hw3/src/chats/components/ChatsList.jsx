import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { useAuth } from '../../auth/context';
import { apiEndpoints } from '../services/endpoints';

export default function ChatsListComponent({ currentChatId }) {
    const client = useAuth();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                let chats = await client.request(apiEndpoints.chatsListUrl, {}, "GET");
                setChats(chats);
            } catch (err) {
                alert(err);
            }
        };
        fetchChats();
    }, [client]);

    return <>
        {chats.map((chat) => (
            <Link
                to={`/chats/${chat.id}`}
                key={chat.id}
                className={`list-group-item list-group-item-action ${currentChatId == chat.id ? "active" : ""}`}
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{chat.name}</h5>
                    <small className="text-body-secondary">13 minutes ago</small>
                </div>
                <p className="mb-1"></p>
                <small className="text-body-secondary">Last message</small>
            </Link>
        ))}
    </>
}