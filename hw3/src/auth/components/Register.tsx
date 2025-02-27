import { useRef, FormEvent } from 'react';

import { Validator, ValidationError } from '../validator';
import { useAuth } from '../context';

export default function RegisterFormComponent() {
    const auth = useAuth();
    const username = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password1 = useRef<HTMLInputElement>(null);
    const password2 = useRef<HTMLInputElement>(null);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!username.current || !email.current || !password1.current || !password2.current) {
            return;
        }

        try {
            Validator.validateUsername(username.current.value);
            Validator.validateEmail(email.current.value);
            Validator.validatePasswordConfirmation(password1.current.value, password2.current.value);
            Validator.validatePassword(password1.current.value);
        } catch (err) {
            if (err instanceof ValidationError) {
                alert(`Error: ${err.message}`);
                return;
            }
        }

        await auth.register(username.current.value, email.current.value, password1.current.value);
    }

    return (
        <div className="container">
            <form onSubmit={handleRegister} className="w-25 mx-auto mt-5 card p-4" id="register-form">
                <h3>Register</h3>
                <div className="mb-3">
                    <label htmlFor="register-username" className="form-label">Username</label>
                    <input ref={username} type="text" className="form-control" id="register-username" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="register-email" className="form-label">Email</label>
                    <input ref={email} type="email" className="form-control" id="register-email" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="register-password1" className="form-label">Password</label>
                    <input ref={password1} type="password" className="form-control" id="register-password1" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="register-password2" className="form-label">Repeat password</label>
                    <input ref={password2} type="password" className="form-control" id="register-password2" required/>
                </div>
                <button type="submit" id="register-btn" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}