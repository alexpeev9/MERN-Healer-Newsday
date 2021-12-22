import { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";
import ErrorInput from '../../ErrorInput';

const ImageUrl = ({ imageUrl }) => {
    const { register } = useFormContext();
    const [currentImage, setImage] = useState(imageUrl);
    
    useEffect(() => {
        const imageBlock = document.getElementById("imageInput");
        imageBlock.addEventListener('change', (e) => setImage(e.target.value))
    }, [])
    return (
        <Form.Field>
            <input
                id="imageInput"
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
            {currentImage ? <div className="text-center"><img src={currentImage} className="image-fixed d-inline-block" alt="Invalid Url" /></div> : <></>}
        </Form.Field>
    );
}

export default ImageUrl;