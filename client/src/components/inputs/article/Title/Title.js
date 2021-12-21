import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";
import ErrorInput from '../../ErrorInput';

const Title = ({title}) => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <ErrorInput value="title" />
            <label>Title</label>
            <input
                placeholder='Title'
                type="text"
                defaultValue={title}
                
                {...register("title", {
                    required: {
                        value: true,
                        message: "Title is Required!"
                    },
                    minLength: {
                        value: 5,
                        message: `Title must be more than 5 letters!`
                    },
                    maxLength: {
                        value: 35,
                        message: `Title must be smaller than 35 letters!`
                    }
                })}
            />
        </Form.Field>
    );
}

export default Title;