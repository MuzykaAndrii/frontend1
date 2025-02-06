import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Auth from "./services/auth";
import AuthStorage from "./services/authStorage";
import endpoints from "./services/endpoints";
import { AuthContext } from "./context";


export default function AuthProvider({ children }) {
    const auth = new Auth(AuthStorage, endpoints);
    let [currentUser, setCurrentUser] = useState(auth.getCurrentUser());
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            await auth.login_user(username, password);
            setCurrentUser(auth.getCurrentUser());
            navigate("/");
        } catch (error) {
            alert(error);
        }
    }

    const logout = () => {
        try {
            auth.logout_user();
            setCurrentUser(null);
            setTimeout(() => navigate("/login"), 0);

        } catch (error) {
            alert(error);
        }
    }

    const register = async (username, email, password) => {
        try {
            await auth.register_user(username, email, password);
            alert("Registered successfully, now you can log in.");
            navigate("/login");
        } catch (error) {
            alert(error);
        }
    }

    const request = async (url, data, method) => {
        return await auth.request(url, data, method);
    }

    return (
        <AuthContext.Provider value={{
            currentUser,
            login,
            register,
            logout,
            request,
        }}>
            {children}
        </AuthContext.Provider>
    );
};