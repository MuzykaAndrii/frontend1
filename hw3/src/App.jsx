import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HeaderComponent from "./common/components/Header"
import LoginComponent from "./auth/login"
import RegisterComponent from "./auth/register"


export default function AppComponent() {
    let [isAuthenticated, setAuth] = useState(false);

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