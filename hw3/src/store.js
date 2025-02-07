import { configureStore } from '@reduxjs/toolkit';
import { addChatsReducer } from "./chats/reducers";

const store = configureStore({ reducer: addChatsReducer });
export default store;