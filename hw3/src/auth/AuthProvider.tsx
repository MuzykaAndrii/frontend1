import { useState, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';

import Auth from "./services/auth";
import AuthStorage from "./services/authStorage";
import endpoints from "./services/endpoints";
import { AuthContext } from "./context";

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const auth = new Auth(AuthStorage, endpoints);
    const [currentUser, setCurrentUser] = useState(auth.getCurrentUser());
    const navigate = useNavigate();

    const login = async (username: string, password: string): Promise<void> => {
        try {
            await auth.login_user(username, password);
            setCurrentUser(auth.getCurrentUser());
            navigate("/");
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Login failed');
        }
    }

    const logout = (): void => {
        try {
            auth.logout_user();
            setCurrentUser(null);
            setTimeout(() => navigate("/login"), 0);
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Logout failed');
        }
    }

    const register = async (username: string, email: string, password: string): Promise<void> => {
        try {
            await auth.register_user(username, email, password);
            alert("Registered successfully, now you can log in.");
            navigate("/login");
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Registration failed');
        }
    }

    const request = async <T,>(url: string, data?: any, method: string = "POST"): Promise<T> => {
        return await auth.request(url, data, method);
    }

    const getAuthData = () => {
        return auth.getAuthData();
    }

    return (
        <AuthContext.Provider value={{
            currentUser,
            login,
            register,
            logout,
            request,
            getAuthData,
        }}>
            {children}
        </AuthContext.Provider>
    );
}