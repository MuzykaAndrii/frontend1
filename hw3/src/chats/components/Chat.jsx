import { useAuth } from '../../auth/context';
import ChatsListComponent from './ChatsList';
import ActiveChatComponent from './ActiveChat';

export default function ChatComponent() {
    const client = useAuth();

    return <>
        <div className="row my-5" style={{ height: "80vh" }}>
            <div className="col-md-5 chatList">
                <div className="list-group">
                    <ChatsListComponent />
                </div>
            </div>

            <div className="col-md-7 currentChat d-flex flex-column">
                <ActiveChatComponent />
            </div>
        </div>
    </>
}