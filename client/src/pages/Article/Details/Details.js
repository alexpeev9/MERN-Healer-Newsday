import { useEffect, useContext, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';

import { getOneService, deleteOneService } from "../../../services/articleService";
import { ErrorContext } from '../../../utils/Context.js';

const Details = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState();
    const setError = useContext(ErrorContext)[1]
    const navigate = useNavigate();

    const deleteArticle = async () => {
        let confirmed = window.confirm('Are you sure you want to delete this article?');
        if (confirmed) {
            const response = await deleteOneService(articleId);
            if (response.ok) {
                navigate('/');
            } else {
                setError(`Error: ${response.message}`);
            }
        }
    }

    useEffect(() => {
        const getArticle = async () => {
            const response = await getOneService(articleId);
            if (response.ok) {
                setArticle(response.article);
            } else {
                setError(`Error: ${response.message}`);
            }
        }
        getArticle();
    }, [articleId])

    return (
        article ?
            <div className="container">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Image</th>
                            <th scope="col">Description</th>
                            <th scope="col">Votes</th>
                            <th scope="col">Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{article.title}</td>
                            <td><img className="d-flex" src={article.imageUrl} alt={article.title} width="300" height="300" /></td>
                            <td>{article.description}</td>
                            <td>{article.rating}</td>
                            <td>
                                <a href={`/article/edit/${article._id}`} className="text-white">Update</a>
                                <br />
                                <button onClick={deleteArticle}>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            : <h3 className="text-danger text-center"> Loading... </h3>
    );
}
export default Details;