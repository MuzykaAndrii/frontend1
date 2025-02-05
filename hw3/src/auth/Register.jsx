import { useRef } from 'react'


export default function RegisterFormComponent() {
    let username = useRef(null);
    let email = useRef(null);
    let password1 = useRef(null);
    let password2 = useRef(null);

    const handleRegister = () => {
        console.log(username.current.value);
        console.log(email.current.value);
        console.log(password1.current.value);
        console.log(password2.current.value);
    }

    return <>
    <div className="container">
        <form className="w-25 mx-auto mt-5" id="register-form">
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
            <button onClick={handleRegister} type="button" id="register-btn" className="btn btn-primary">Register</button>
        </form>
    </div>
</>
};