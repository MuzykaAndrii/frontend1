import { useState, createContext, useContext } from "react"

import Auth from "./services/auth"
import AuthStorage from "./services/authStorage"
import endpoints from "./services/endpoints"
import { AuthContext } from "./context"


export default function AuthProvider({ children }) {
    const auth = new Auth(AuthStorage, endpoints);
    let [currentUser, setCurrentUser] = useState(auth.getCurrentUser());

    const login = async (username, password) => {
        try {
            await auth.login_user(username, password);
            setCurrentUser(auth.getCurrentUser());
        } catch (error) {
            alert(error);
        }
    }

    const logout = () => {
        try {
            auth.logout_user();
            setCurrentUser(null);
        } catch (error) {
            alert(error);
        }
    }

    const register = async (username, email, password) => {
        try {
            await auth.register_user(username, email, password);
            alert("Registered successfully, now you can log in.");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <AuthContext.Provider value={{ 
            currentUser, 
            login, 
            register, 
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};