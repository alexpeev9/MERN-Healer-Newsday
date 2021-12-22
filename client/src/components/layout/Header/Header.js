import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
    return (
        <>
            <div className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                        <Link className="navbar-brand" to="/">
                            <img src="/images/HealerFull.png" alt="Healer Newsday" /></Link>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav pull-right mainNav">
                            <li><Link to="/">Home</Link></li>
                            {user ? (
                                <>
                                    <li><Link to="/">Hello {user}</Link></li>
                                    <li><Link to="/article/create">Add Article</Link></li>
                                    <li><Link to="/logout">Logout</Link></li>
                                </>) : (
                                <>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                </>)}
                        </ul>
                    </div>
                </div>
            </div>
        </>)
}

export default Header;