import { useContext, useRef } from "react"
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';

import './Register.css';
import Username from "../../components/inputs/user/Username";
import FirstName from "../../components/inputs/user/FirstName"
import LastName from "../../components/inputs/user/LastName"
import Password from "../../components/inputs/user/Password";
import RePassword from "../../components/inputs/user/RePassword";

import { registerService } from '../../services/userService.js';
import { setCookie } from '../../utils/cookieUtils.js';
import { UserContext, ErrorContext } from '../../utils/Context.js';

const Register = () => {
    const methods = useForm();
    const navigate = useNavigate();
    const [username, setUsername] = useContext(UserContext);
    const setError = useContext(ErrorContext)[1];

    const password = useRef({});
    password.current = methods.watch("password", "");

    const onRegister = async ({ username, firstName, lastName, password }) => {
        let response = await registerService({ username, firstName, lastName, password });
        if (response.ok) {
            setCookie(response.token);
            setUsername(username);
            navigate('/');
        } else {
            setError(`Error: ${response.message}`)
        }
    }
    return (
        !username ? <div className="register-form">
            <FormProvider {...methods} >
                <h1>Register</h1>
                <Form onSubmit={methods.handleSubmit(onRegister)} method="POST">
                    <Username />
                    <FirstName />
                    <LastName />
                    <Password />
                    <RePassword value={password.current} />
                    <Button type="submit" className="btn btn-block">
                        Register
                    </Button>
                </Form>
            </FormProvider>
        </div> : <h3 className="text-center text-danger">You are already logged in!</h3>
    );
}
export default Register;