import { configureStore } from '@reduxjs/toolkit';

import chatsReducer from "./chats/slices";


const store = configureStore({
    reducer: {
        chats: chatsReducer
    }
});

export default store;