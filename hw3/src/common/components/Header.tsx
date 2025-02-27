import { Link } from "react-router-dom";

import { useAuth } from '../../auth/context';


export default function HeaderComponent() {
    const auth = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand" href="#">CHI Social</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {auth.currentUser ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/chats">Chats</Link>
                                </li>
                                <li className="nav-link" id="currentUser">
                                    Logged in as: <span id="currentUserId">{auth.currentUser.user_id}</span>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={auth.logout} className="nav-link" to="/logout">Logout</Link>
                                </li>
                                
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
