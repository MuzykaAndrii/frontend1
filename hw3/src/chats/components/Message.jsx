export default function MessageComponent({ message, sent_at, from_user_username, from_user_id }) {

    return <>
        <p><b>{from_user_username}: </b>{message}</p>

    </>
}