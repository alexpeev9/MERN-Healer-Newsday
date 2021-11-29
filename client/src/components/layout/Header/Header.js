import './Header.css';

const Header = ({ user }) => {
    return (
        <div className="m-4">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">
                        <img src="/images/HealerFull.png" height="58" alt="Healer Logo" />
                    </a>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">
                            <a href="/" className="nav-item nav-link active">Home</a>
                        </div>
                        <div className="navbar-nav ms-auto">
                            {user ? (
                                <>
                                    <p className="nav-item nav-link user-message">Hello {user}</p>
                                    <a href="/logout" className="nav-item nav-link">Logout</a>
                                </>) : (
                                <>
                                    <a href="/login" className="nav-item nav-link">Login</a>
                                    <a href="/register" className="nav-item nav-link">Register</a>
                                </>)}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;