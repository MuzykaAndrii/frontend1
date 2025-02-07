import { configureStore } from '@reduxjs/toolkit';

import chatsReducer from "./chats/reducers";


const store = configureStore({
    reducer: {
        chats: chatsReducer
    }
});

export default store;