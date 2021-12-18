import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";
import ErrorInput from '../../ErrorInput';

const Description = () => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <ErrorInput value="description" />
            <label>Description</label>
            <input
                placeholder='Description'
                type="text"
                {...register("description", {
                    required: {
                        value: true,
                        message: "Description is Required!"
                    },
                    minLength: {
                        value: 400,
                        message: `Description must be more than 400 characters!`
                    },
                    maxLength: {
                        value: 4000,
                        message: `Description must be smaller than 4000 characters!`
                    }
                })}
            />
        </Form.Field>
    );
}

export default Description;