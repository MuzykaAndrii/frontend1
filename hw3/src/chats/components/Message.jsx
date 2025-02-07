export default function MessageComponent({ message, sent_at, from_user_username, from_user_id, current_user }) {
    const isCurrentUser = from_user_id === current_user.user_id;
    const date = new Date(sent_at);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={isCurrentUser ? "chat-message-right pb-4" : "chat-message-left pb-4"}>
            <div>
                <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    className="rounded-circle mx-3"
                    alt={from_user_username}
                    width="40"
                    height="40"
                />
                <div className="text-muted small text-nowrap mt-2 mx-3">{time}</div>
            </div>
            <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                <div className="font-weight-bold mb-1">
                    {isCurrentUser ? "You" : from_user_username}
                </div>
                {message}
            </div>
        </div>
    );
}
