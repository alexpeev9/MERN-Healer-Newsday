import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";
import ErrorInput from '../../ErrorInput';

const ImageUrl = () => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <ErrorInput value="imageUrl" />
            <label>ImageUrl</label>
            <input
                placeholder='ImageUrl'
                type="text"
                {...register("imageUrl", {
                    required: {
                        value: true,
                        message: "ImageUrl is Required!"
                    },
                    pattern: {
                        value: /^https?:\/\//i,
                        message: "ImageUrl should start with 'http' or 'https'"
                    }
                })}
            />
        </Form.Field>
    );
}

export default ImageUrl;