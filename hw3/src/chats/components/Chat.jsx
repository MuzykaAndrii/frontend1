import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { wsEndpoints } from '../services/endpoints';
import ChatsListComponent from './ChatsList';
import ActiveChatComponent from './ActiveChat';
import { useChatServices } from '../context';
import { addMessage } from "../slices";


export default function ChatComponent() {
    const urlParams = useParams();
    const chatId = Number(urlParams.chat_id);
    const { ws } = useChatServices();
    const chats = useSelector(state => state.chats.chats);
    const dispatch = useDispatch()

    useEffect(() => {
        ws.setMessageHandler((message, chatId) => {
            dispatch(addMessage({ message, chatId }));
        });

        Object.keys(chats).forEach(chatId => {
            const socketUrl = new URL(wsEndpoints.getChatUrl(chatId));
            ws.connect(chatId, socketUrl);
        });
    }, [chats, ws, dispatch]);

    return <>
        <div className="row my-5" style={{ height: "80vh" }}>
            <div className="col-md-5 chatList border rounded">
                <div className="list-group mt-3">
                    <ChatsListComponent currentChatId={chatId} />
                </div>
            </div>

            <div className="col-md-7 currentChat d-flex flex-column border rounded">
                {chatId
                    ? (<ActiveChatComponent chatId={chatId} />)
                    : (<h3 className="text-center">No active chat selected.</h3>)
                }
            </div>
        </div>
    </>
}