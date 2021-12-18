import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";
import ErrorInput from '../../ErrorInput';

const Username = () => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <ErrorInput value="username" />
            <label>Username</label>
            <input
                placeholder='Username'
                type="text"
                {...register("username", {
                    required: {
                        value: true,
                        message: "Username is Required!"
                    },
                    minLength: {
                        value: 3,
                        message: `Username must be bigger than 3 letters!`
                    },
                    maxLength: {
                        value: 15,
                        message: `Username must be smaller than 15 letters!`
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Username should consist of only english letters and digits!"
                    }
                })}
            />
        </Form.Field>
    );
}

export default Username;