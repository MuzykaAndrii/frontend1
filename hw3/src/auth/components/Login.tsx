import { useRef, FormEvent } from 'react';
import { useAuth } from '../context';

export default function LoginFormComponent() {
    const auth = useAuth();
    const login = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (login.current && password.current) {
            await auth.login(login.current.value, password.current.value);
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleLogin} className="w-25 mx-auto mt-5 p-4 card" id="login-form">
                <h3>Log in</h3>
                <div className="mb-3">
                    <label htmlFor="login-username" className="form-label">Username</label>
                    <input ref={login} className="form-control" id="login-username" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="login-password" className="form-label">Password</label>
                    <input ref={password} type="password" className="form-control" id="login-password" required/>
                </div>
                <button type="submit" id="login-btn" className="btn btn-primary">Log in</button>
            </form>
        </div>
    );
}