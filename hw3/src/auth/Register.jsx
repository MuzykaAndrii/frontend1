function RegisterFormComponent() {
    return <div className="container">
    <form className="w-25 mx-auto mt-5" id="register-form">
        <div className="mb-3">
            <label for="register-username" className="form-label">Username</label>
            <input type="text" className="form-control" id="register-username" required/>
        </div>
        <div className="mb-3">
            <label for="register-email" className="form-label">Email</label>
            <input type="email" className="form-control" id="register-email" required/>
        </div>
        <div className="mb-3">
            <label for="register-password1" className="form-label">Password</label>
            <input type="password" className="form-control" id="register-password1" required/>
        </div>
        <div className="mb-3">
            <label for="register-password2" className="form-label">Repeat password</label>
            <input type="password" className="form-control" id="register-password2" required/>
        </div>
        <button type="button" id="register-btn" className="btn btn-primary">Register</button>
    </form>
</div>

}

export default RegisterFormComponent;