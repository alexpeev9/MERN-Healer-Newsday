import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";

import ErrorInput from '../../ErrorInput';

const Password = () => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <ErrorInput value="password" />
            <label>Password</label>
            <input
                placeholder='Password'
                type="password"
                {...register("password", {
                    required: {
                        value: true,
                        message: "Password is Required!"
                    },
                    minLength: {
                        value: 4,
                        message: `Password must be bigger than 4 letters!`
                    },
                    maxLength: {
                        value: 15,
                        message: `Password must be smaller than 15 letters!`
                    }
                })}
            />
        </Form.Field>
    );
}

export default Password;