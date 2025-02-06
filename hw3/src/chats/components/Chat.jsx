import { useParams } from "react-router-dom";

import ChatsListComponent from './ChatsList';
import ActiveChatComponent from './ActiveChat';

export default function ChatComponent() {
    const { chat_id } = useParams();

    return <>
        <div className="row my-5" style={{ height: "80vh" }}>
            <div className="col-md-5 chatList">
                <div className="list-group">
                    <ChatsListComponent currentChatId={chat_id} />
                </div>
            </div>

            <div className="col-md-7 currentChat d-flex flex-column">
                <ActiveChatComponent chatId={chat_id} />
            </div>
        </div>
    </>
}