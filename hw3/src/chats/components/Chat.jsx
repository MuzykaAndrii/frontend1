import { useAuth } from '../../auth/context';
import { useState, useEffect } from 'react';
import endpoints from '../services/endpoints';

export default function ChatComponent() {
    const client = useAuth();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                let chats = await client.request(endpoints.chatsListUrl, {}, "GET");
                setChats(chats);
            } catch (err) {
                // alert(err);
                throw err;
            }
        };
        fetchChats();
    }, [client]);

    return <>
        <div className="row my-5" style={{ height: "80vh" }}>
            <div className="col-md-5 chatList">
                <div className="list-group">
                    {chats.map((chat) => (
                        <a href="#" key={chat.id} className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{chat.name}</h5>
                                <small className="text-body-secondary">13 minutes ago</small>
                            </div>
                            <p className="mb-1"></p>
                            <small className="text-body-secondary">Last message</small>
                        </a>
                    ))}
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