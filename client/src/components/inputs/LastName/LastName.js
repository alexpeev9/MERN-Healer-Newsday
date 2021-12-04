import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";

import ErrorInput from '../../error/ErrorInput';

const LastName = () => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <ErrorInput value="lastName" />
            <label>LastName</label>
            <input
                placeholder='LastName'
                type="text"
                {...register("lastName", {
                    required: {
                        value: true,
                        message: "LastName is Required!"
                    },
                    minLength: {
                        value: 3,
                        message: `LastName must be bigger than 3 letters!`
                    },
                    maxLength: {
                        value: 15,
                        message: `LastName must be smaller than 15 letters!`
                    },
                    pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "LastName should consist of only english letters"
                    }
                })}
            />
        </Form.Field>
    );
}

export default LastName;