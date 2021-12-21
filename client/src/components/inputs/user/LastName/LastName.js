import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";

import ErrorInput from '../../ErrorInput';

const LastName = () => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <input
                className="form-control"
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
            <ErrorInput value="lastName" />
        </Form.Field>
    );
}

export default LastName;