
export function addChats(chats) {
    return {
        type: "chats/addChats",
        payload: chats
    }
}

export function addMessage(message, chatId) {
    return {
        type: "chats/addMessage",
        payload: {
            message: message,
            chatId: chatId
        }
    }
}