import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthProvider from "./auth/AuthProvider"
import HeaderComponent from "./common/components/Header"
import LoginComponent from "./auth/components/Login"
import RegisterComponent from "./auth/components/Register"
import ChatComponent from "./chats/components/Chat"
import { ChatServiceProvider } from "./chats/services/chatServiceProvider"
import store from './store'
import { addChats, addMessage } from "./chats/reducers"


export default function AppComponent() {
    // let chats = [
    //     { id: 1, name: "chat1" },
    //     { id: 2, name: "chat2" }
    // ]
    // store.dispatch(addChats(chats));
    // store.dispatch(addMessage({
    //     chatId: 1,
    //     data: {
    //         message: "Message data",
    //         sent_at: "timestamp",
    //         from_user_id: "user_id",
    //         from_user_username: "username"

    //     }
    // }));
    // console.log(store.getState());



    return (
        <Router>
            <AuthProvider>
                <ChatServiceProvider>
                    <HeaderComponent />
                    <div className='container'>
                        <Routes>
                            <Route path="/login" element={<LoginComponent />} />
                            <Route path="/register" element={<RegisterComponent />} />
                            <Route path="/chats" element={<ChatComponent />} />
                            <Route path="/chats/:chat_id" element={<ChatComponent />} />
                        </Routes>
                    </div>
                </ChatServiceProvider>
            </AuthProvider>
        </Router>
    );
}