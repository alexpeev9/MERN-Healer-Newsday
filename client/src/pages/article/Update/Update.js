import { useEffect, useContext, useState } from "react"
import { useForm, FormProvider } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

import Title from "../../../components/inputs/article/Title";
import ImageUrl from "../../../components/inputs/article/ImageUrl";
import Description from "../../../components/inputs/article/Description";
import { getUserIdCookie } from '../../../utils/cookieUtils';

import { getOneService, updateService } from '../../../services/articleService.js';
import { ErrorContext } from '../../../utils/Context.js';

const Update = () => {
    const methods = useForm();
    const navigate = useNavigate();
    const [hasCreator, setHasCreator] = useState(false);
    const setError = useContext(ErrorContext)[1]

    const { articleId } = useParams();
    const [article, setArticle] = useState();
    useEffect(() => {
        const getArticle = async () => {
            const userId = getUserIdCookie();
            const response = await getOneService(articleId);
            if (response.ok) {
                setArticle(response.article);
                setHasCreator(response.article?.creator._id === userId);
            } else {
                setError(`Error: ${response.message}`);
            }
        }
        getArticle();
    }, [articleId, setError])

    const onUpdate = async ({ title, imageUrl, description }) => {
        let response = await updateService(articleId, { title, imageUrl, description });
        if (response.ok) {
            navigate(`/article/${articleId}`);
        } else {
            setError(`Error: ${response.message}`)
        }
    }
    return (
        hasCreator ? article ?
            <div style={{ margin: "5rem" }}>
                <FormProvider {...methods} >
                    <Form onSubmit={methods.handleSubmit(onUpdate)}>
                        <Title title={article?.title} />
                        <ImageUrl imageUrl={article?.imageUrl} />
                        <Description description={article?.description} />
                        <Button type="submit" className="btn btn-success btn-block">
                            Update
                        </Button>
                    </Form>
                </FormProvider>
            </div> : <h3 className="text-danger text-center"> Loading... </h3> : <h3 className="text-danger text-center"> You cannot edit this article!</h3>
    );
}
export default Update;