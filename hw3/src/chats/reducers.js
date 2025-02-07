const initialChats = {};

export function addChatsReducer(state = initialChats, action) {
    if (action.type === "chats/addChats") {
        let newChatsState = {};

        action.payload.forEach(chat => {
            newChatsState[chat.id] = {
                id: chat.id,
                name: chat.name,
                messages: new Array()
            }
        });

        return {
            ...state,
            ...newChatsState
        }
    }

    return state
}