import { createSlice } from '@reduxjs/toolkit'

const initialChats = {};

export const chatsSlice = createSlice({
    name: "chats",
    initialState: initialChats,

    reducers: {
        addChats: (state, action) => {
            action.payload.forEach(chat => {
                state[chat.id] = {
                    id: chat.id,
                    name: chat.name,
                    messages: new Array()
                }
            });
        },

        addMessage: (state, action) => {
            const chatId = action.payload.chatId;
            const message = action.payload.data;

            if (state[chatId]) {
                state[chatId].messages.push(message);
            } else {
                console.error(`Chat with id ${chatId} does not exist!`);
            }
        }
    }
});

export const { addChats, addMessage } = chatsSlice.actions;
export default chatsSlice.reducer;