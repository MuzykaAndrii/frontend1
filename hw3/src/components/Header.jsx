function HeaderComponent() {
    return <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
        <a className="navbar-brand" href="#">CHI Social</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="">Home</a>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-link" id="currentUser">
                    Logged in as user with id: <span id="currentUserId"></span>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="login-link" href="">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="register-link" href="">Register</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="logout-link" href="">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

}

export default HeaderComponent;