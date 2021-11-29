import { useContext } from "react"
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { login } from '../../services/userService.js';
import { setCookie } from '../../utils/cookieUtils.js';
import { UserContext } from '../../utils/Context.js';

const Login = () => {
    const navigate = useNavigate();
    const setUsername = useContext(UserContext)[1]

    const onLogin = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let username = formData.get('username');
        let password = formData.get('password');

        login({
            username,
            password,
        })
            .then(result => {
                setCookie(result);
                setUsername(username);
                navigate('/');
            })
    }
    return (
        <div className="login-form">
            <form onSubmit={onLogin} method="POST">
                <h2 className="text-center">Log in</h2>
                <div className="form-group">
                    <input type="text" name="username" className="form-control" placeholder="Username" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="form-control" placeholder="Password" required="required" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                </div>
                <div className="clearfix">
                    <label className="float-left form-check-label"><input type="checkbox" /> Remember me</label>
                </div>
            </form>
            <p className="text-center"><a href="/register">Create an Account</a></p>
        </div>
    );
}
export default Login;