import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";
import ErrorInput from '../../ErrorInput';

const ImageUrl = ({ imageUrl }) => {
    const { register } = useFormContext();
    return (
        <Form.Field>
            <input
                className="form-control"
                placeholder='ImageUrl'
                type="text"
                defaultValue={imageUrl}
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
            <ErrorInput value="imageUrl" />
        </Form.Field>
    );
}

export default ImageUrl;