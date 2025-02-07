import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { useChatServices } from '../context';
import { addChats } from '../slices';

export default function ChatsListComponent({ currentChatId }) {
    const dispatch = useDispatch();
    const chatsObject = useSelector(state => state.chats);
    const chats = Object.values(chatsObject); // Convert object to array
    const { api } = useChatServices();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const chatsList = await api.listChats();
                dispatch(addChats(chatsList));
            } catch (err) {
                console.error(err);
            }
        };
        fetchChats();
    }, [api]);

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