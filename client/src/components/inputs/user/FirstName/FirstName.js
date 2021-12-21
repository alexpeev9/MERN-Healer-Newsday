import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";
import ErrorInput from '../../ErrorInput';

const FirstName = () => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <input
                className="form-control"
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
            <ErrorInput value="firstName" />
        </Form.Field>
    );
}

export default FirstName;