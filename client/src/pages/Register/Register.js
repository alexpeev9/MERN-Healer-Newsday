import { useContext } from "react"
import { useNavigate } from 'react-router-dom';

import './Register.css';
import { register } from '../../services/userService.js';
import { setCookie } from '../../utils/cookieUtils.js';
import { UserContext, ErrorContext } from '../../utils/Context.js';

const Register = () => {
    const navigate = useNavigate();
    const setUsername = useContext(UserContext)[1];
    const setError = useContext(ErrorContext)[1];

    const onRegister = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let username = formData.get('username');
        let password = formData.get('password');
        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');

        let response = await register({ username, firstName, lastName, password });
        if (response.ok) {
            setCookie(response.token);
            setUsername(username);
            navigate('/');
        } else {
            setError(`Error: ${response.message}`)
        }
    }
    return (
        <div className="register-form">
            <form onSubmit={onRegister} method="POST">
                <h2 className="text-center">Register</h2>
                <div className="form-group">
                    <input type="text" name="username" className="form-control" placeholder="Username" required="required" />
                </div>
                <div className="form-group">
                    <input type="text" name="firstName" className="form-control" placeholder="FirstName" required="required" />
                </div>
                <div className="form-group">
                    <input type="text" name="lastName" className="form-control" placeholder="LastName" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="form-control" placeholder="Password" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="form-control" placeholder="Repeat Password" required="required" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block">Register</button>
                </div>
                <div className="clearfix">
                    <label className="float-left form-check-label"><input type="checkbox" /> Remember me</label>
                </div>
            </form>
        </div>
    );
}
export default Register;