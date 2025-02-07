
export function addChats(chats) {
    return {
        type: "chats/addChats",
        payload: chats
    }
}