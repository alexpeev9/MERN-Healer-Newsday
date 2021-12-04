import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";
import ErrorInput from '../../error/ErrorInput/ErrorInput';

const RePassword = (value) => {
    const { register } = useFormContext();
    let repeatedPassword = value["value"];
    return (
        <Form.Field>
            <ErrorInput value="rePassword" />
            <label>RePassword</label>
            <input
                placeholder='Repeat Password'
                type="password"
                {...register("rePassword", {
                    required: {
                        value: true,
                        message: "Repeated Password is Required!"
                    },
                    validate: value =>
                        value === repeatedPassword || "Passwords do not match!"
                })}
            />
        </Form.Field>
    );
}

export default RePassword;