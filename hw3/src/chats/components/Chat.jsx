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
        <div className="row">
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
            <div className="col-md-7 currentChat">

            </div>
        </div>


    </>
}