import { useParams } from "react-router-dom";

import ChatsListComponent from './ChatsList';
import ActiveChatComponent from './ActiveChat';

export default function ChatComponent() {
    const { chat_id } = useParams();

    return <>
        <div className="row my-5" style={{ height: "80vh" }}>
            <div className="col-md-5 chatList border rounded">
                <div className="list-group mt-3">
                    <ChatsListComponent currentChatId={chat_id} />
                </div>
            </div>

            <div className="col-md-7 currentChat d-flex flex-column border rounded">
                {chat_id
                    ? (<ActiveChatComponent chatId={chat_id} />)
                    : (<h3 className="text-center">No active chat selected.</h3>)
                }
            </div>
        </div>
    </>
}