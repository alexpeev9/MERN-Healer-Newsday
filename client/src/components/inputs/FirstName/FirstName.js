import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";

import ErrorInput from '../../error/ErrorInput';

const FirstName = () => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <ErrorInput value="firstName" />
            <label>FirstName</label>
            <input
                placeholder='FirstName'
                type="text"
                {...register("firstName", {
                    required: {
                        value: true,
                        message: "FirstName is Required!"
                    },
                    minLength: {
                        value: 3,
                        message: `FirstName must be bigger than 3 letters!`
                    },
                    maxLength: {
                        value: 15,
                        message: `FirstName must be smaller than 15 letters!`
                    },
                    pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "FirstName should consist of only english letters"
                    }
                })}
            />
        </Form.Field>
    );
}

export default FirstName;