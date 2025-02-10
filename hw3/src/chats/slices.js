import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchChats = createAsyncThunk(
    'chats/fetchChats',
    async (api, { rejectWithValue }) => {
        try {
            return await api.listMyChats();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const initialChats = {};

export const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chats: initialChats,
        loading: false,
        error: null
    },

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
            const message = action.payload.message;

            if (state.chats[chatId]) {
                state.chats[chatId].messages.push(message);
            } else {
                console.error(`Chat with id ${chatId} does not exist!`);
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload.reduce((acc, chat) => {
                    acc[chat.id] = { id: chat.id, name: chat.name, messages: [] };
                    return acc;
                }, {});
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { addChats, addMessage } = chatsSlice.actions;
export default chatsSlice.reducer;