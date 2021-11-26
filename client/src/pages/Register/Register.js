import { useNavigate } from 'react-router-dom';

import './Register.css';
import { register } from '../../services/authService.js';

const Register = () => {
    const navigate = useNavigate();
    const onRegister = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let username = formData.get('username');
        let password = formData.get('password');
        let firstName = formData.get('firstName');
        let lastName = formData.get('firstName');

        register({
            username,
            firstName,
            lastName,
            password,
        })
            .then(result => {
                console.log(result);
                navigate('/');
            })
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
                    <label className="float-left form-check-label"><input type="checkbox"/> Remember me</label>
                </div>
            </form>
        </div>
    );
}
export default Register;