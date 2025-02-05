import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HeaderComponent from "./common/components/Header"
import LoginComponent from "./auth/components/Login"
import RegisterComponent from "./auth/components/Register"

import Auth from "./auth/services/auth"
import AuthStorage from "./auth/services/authStorage"
import endpoints from "./auth/services/endpoints"


export default function AppComponent() {
    let [currentUser, setCurrentUser] = useState(AuthStorage.getCurrentUser());
    const auth = new Auth(AuthStorage, endpoints);

    const handleLogin = async (username, password) => {
        try {
            await auth.login_user(username, password);
            setCurrentUser(AuthStorage.getCurrentUser());
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Router>
            <HeaderComponent currentUser={currentUser} />
            <div className='container'>
                <Routes>
                    <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
                    <Route path="/register" element={<RegisterComponent />} />
                </Routes>
            </div>
        </Router>
    );
};