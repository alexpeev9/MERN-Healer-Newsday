import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";
import ErrorInput from '../../ErrorInput';

const Title = () => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <ErrorInput value="title" />
            <label>FirstName</label>
            <input
                placeholder='FirstName'
                type="text"
                {...register("title", {
                    required: {
                        value: true,
                        message: "Title is Required!"
                    },
                    minLength: {
                        value: 20,
                        message: `Title must be more than 20 letters!`
                    },
                    maxLength: {
                        value: 100,
                        message: `Title must be smaller than 100 letters!`
                    }
                })}
            />
        </Form.Field>
    );
}

export default Title;