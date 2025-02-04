function LoginFormComponent() {
    return     <div className="container">
    <form className="w-25 mx-auto mt-5" id="login-form">
        <div className="mb-3">
            <label for="login-username" className="form-label">Username</label>
            <input className="form-control" id="login-username" required/>
        </div>
        <div className="mb-3">
            <label for="login-password" className="form-label">Password</label>
            <input type="password" className="form-control" id="login-password" required/>
        </div>
        <button type="button" id="login-btn" className="btn btn-primary">Submit</button>
    </form>
</div>
}

export default LoginFormComponent;