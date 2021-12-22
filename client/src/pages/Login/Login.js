import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';

import './Login.css';
import Username from "../../components/inputs/user/Username";
import Password from "../../components/inputs/user/Password";

import { loginService } from '../../services/userService.js';
import { setCookie } from '../../utils/cookieUtils.js';
import { UserContext, ErrorContext } from '../../utils/Context.js';

const Login = () => {
    const methods = useForm();
    const navigate = useNavigate();
    const [username, setUsername] = useContext(UserContext)
    const setError = useContext(ErrorContext)[1]

    const onLogin = async ({ username, password }) => {
        let response = await loginService({ username, password });
        if (response.ok) {
            setCookie(response.token);
            setUsername(username);
            navigate('/');
        } else {
            setError(`Error: ${response.message}`)
        }
    }
    return (
        !username ? <div className="login-form">
            <FormProvider {...methods} >
                <h1>Login</h1>
                <Form onSubmit={methods.handleSubmit(onLogin)} method="POST">
                    <Username />
                    <Password />
                    <Button type="submit" className="btn btn-block">
                        Login
                    </Button>
                </Form>
            </FormProvider>
        </div> : <h3 className="text-center text-danger">You are already logged in!</h3>
    );
}
export default Login;