import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';

import Title from "../../../components/inputs/article/Title";
import ImageUrl from "../../../components/inputs/article/ImageUrl";
import Description from "../../../components/inputs/article/Description";

import { createService } from '../../../services/articleService.js';
import { ErrorContext } from '../../../utils/Context.js';

const Create = () => {
    const methods = useForm();
    const navigate = useNavigate();
    const setError = useContext(ErrorContext)[1]

    const onCreate = async ({title, imageUrl, description}) => {
        let response = await createService({title, imageUrl, description});
        if (response.ok) {
            navigate('/');
        } else {
            setError(`Error: ${response.message}`)
        }
    }
    return (
        <div className="login-form">
            <FormProvider {...methods} >
                <Form onSubmit={methods.handleSubmit(onCreate)} method="POST">
                    <Title />
                    <ImageUrl />
                    <Description />
                    <Button type="submit" className="btn btn-primary btn-block">
                        Create
                    </Button>
                </Form>
            </FormProvider>
        </div>
    );
}
export default Create;