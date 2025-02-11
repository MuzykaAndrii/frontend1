import { Link } from "react-router-dom";


export default function ChatListItemComponent({ chat, currentChatId }) {
    const lastMsg = chat.messages.at(-1);

    const formatTime = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return <>
        <Link
            to={`/chats/${chat.id}`}
            className={`list-group-item list-group-item-action ${currentChatId == chat.id ? "active" : ""}`}
        >
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{chat.name}</h5>
                <small className="text-body-secondary">{lastMsg ? formatTime(lastMsg.sent_at) : ""}</small>
            </div>
            <p className="mb-1"></p>
            <small className="text-body-secondary">
                {lastMsg ? `${lastMsg.from_user_username}: ${lastMsg.message}` : "No messages yet"}
            </small>
        </Link>
    </>
}