import { useState } from "react";

export default function MessageInputComponent({ ws }) {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (ws.current && message.trim() !== "") {
            ws.current.send(JSON.stringify({ message: message }));
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
