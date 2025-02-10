import { useState } from "react";

import { useChatServices } from '../context';


export default function MessageInputComponent({ chatId }) {
    const [message, setMessage] = useState("");
    const { ws } = useChatServices();


    const sendMessage = () => {
        const conn = ws.connections.get(chatId.toString());
        if (conn && message.trim() !== "") {
            conn.send(JSON.stringify({ message: message }));
            setMessage("");
        }
    };

    return (<>
        <div className="col-11">
            <textarea
                className="form-control"
                rows="1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
        </div>
        <div className="col-1">
            <button type="submit" className="btn btn-primary mb-3" onClick={sendMessage}>
                Send
            </button>
        </div>
    </>);
}
