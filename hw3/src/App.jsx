import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"

import HeaderComponent from "./common/components/Header"
import LoginComponent from "./auth/components/Login"
import RegisterComponent from "./auth/components/Register"

import Auth from "./auth/services/auth"
import AuthStorage from "./auth/services/authStorage"
import endpoints from "./auth/services/endpoints"


export default function AppComponent() {
    const auth = new Auth(AuthStorage, endpoints);
    let [currentUser, setCurrentUser] = useState(auth.getCurrentUser());

    const handleLogin = async (username, password) => {
        try {
            await auth.login_user(username, password);
            setCurrentUser(auth.getCurrentUser());
        } catch (error) {
            alert(error);
        }
    }

    const handleLogout = () => {
        try {
            auth.logout_user();
            setCurrentUser(null);
        } catch (error) {
            alert(error);
        }
    }

    const handleRegister = async (username, email, password) => {
        try {
            await auth.register_user(username, email, password);
            alert("Registered successfully, now you can log in.");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Router>
            <HeaderComponent currentUser={currentUser} onLogout={handleLogout}/>
            <div className='container'>
                <Routes>
                    <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
                    <Route path="/register" element={<RegisterComponent onRegister={handleRegister} />} />
                </Routes>
            </div>
        </Router>
    );
};