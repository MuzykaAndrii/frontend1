import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { useChatServices } from '../context';
import { fetchChats } from '../slices';
import ChatListItemComponent from './ChatListItem'


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
            <ChatListItemComponent key={chat.id} chat={chat} currentChatId={currentChatId} />
        ))}
    </>
}