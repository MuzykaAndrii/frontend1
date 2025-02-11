import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Chat, ChatsState, Message } from './types';
import ChatApiService from './services/chatApi';

export const fetchChats = createAsyncThunk(
    'chats/fetchChats',
    async (api: ChatApiService, { rejectWithValue }) => {
        try {
            return await api.listMyChats();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch chats');
        }
    }
);

const initialState: ChatsState = {
    chats: {},
    loading: false,
    error: null
};

interface AddMessagePayload {
    chatId: number;
    message: Message;
}

export const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        addChats: (state, action: PayloadAction<Chat[]>) => {
            action.payload.forEach(chat => {
                state.chats[chat.id] = {
                    id: chat.id,
                    name: chat.name,
                    messages: []
                };
            });
        },

        addMessage: (state, action: PayloadAction<AddMessagePayload>) => {
            const { chatId, message } = action.payload;
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
                state.chats = action.payload.reduce((acc: Record<number, Chat>, chat) => {
                    acc[chat.id] = { id: chat.id, name: chat.name, messages: [] };
                    return acc;
                }, {});
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { addChats, addMessage } = chatsSlice.actions;
export default chatsSlice.reducer;