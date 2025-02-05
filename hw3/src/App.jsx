import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HeaderComponent from "./common/components/Header"
import LoginComponent from "./auth/components/Login"
import RegisterComponent from "./auth/components/Register"

import Auth from "./auth/services/auth"
import AuthStorage from "./auth/services/authStorage"
import endpoints from "./auth/services/endpoints"


export default function AppComponent() {
    let [isAuthenticated, setAuth] = useState(false);
    const auth = Auth(AuthStorage, endpoints);

    return (
        <Router>
            <HeaderComponent isAuthenticated={isAuthenticated} />
            <div className='container'>
                <Routes>
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/register" element={<RegisterComponent />} />
                </Routes>
            </div>
        </Router>
    );
};