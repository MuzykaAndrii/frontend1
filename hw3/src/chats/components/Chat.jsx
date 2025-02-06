import { useAuth } from '../../auth/context';
import ChatsListComponent from './ChatsList';

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
                <div className="chatHistory flex-grow-1 overflow-auto p-3">
                </div>

                <div className="row g-3 sendMsgArea p-3">
                    <div className="col-11">
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-primary mb-3">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}