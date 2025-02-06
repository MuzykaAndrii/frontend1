import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AuthProvider from "./auth/AuthProvider"
import HeaderComponent from "./common/components/Header"
import LoginComponent from "./auth/components/Login"
import RegisterComponent from "./auth/components/Register"
import ChatComponent from "./chats/components/Chat"


export default function AppComponent() {
    return (
        <Router>
            <AuthProvider>
                <HeaderComponent />
                <div className='container'>
                    <Routes>
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/register" element={<RegisterComponent />} />
                        <Route path="/chats" element={<ChatComponent />} />
                        <Route path="/chats/:chat_id" element={<ChatComponent />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
};