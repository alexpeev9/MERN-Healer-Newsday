import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";
import ErrorInput from '../../ErrorInput';

const Description = ({ description }) => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <textarea
                className="form-control"
                placeholder='Description'
                type="text"
                rows={10}
                defaultValue={description}
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
            <ErrorInput value="description" />
        </Form.Field>
    );
}

export default Description;