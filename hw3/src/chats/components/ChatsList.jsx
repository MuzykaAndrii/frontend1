import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { useChatServices } from '../context';
import { fetchChats } from '../slices';


export default function ChatsListComponent({ currentChatId }) {
    const { api } = useChatServices();
    const dispatch = useDispatch();
    const { chats, loading, error } = useSelector(state => state.chats);

    useEffect(() => {
        dispatch(fetchChats(api));
    }, [dispatch]);

    if (loading) return <p>Loading chats...</p>;
    if (error) return <p>Error: {error}</p>;

    return <>
        {Object.values(chats).map((chat) => (
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