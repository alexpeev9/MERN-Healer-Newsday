import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

import { getOneService } from "../../../services/articleService";

const Details = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        const getArticle = async () => {
            const response = await getOneService(articleId);

            if (response.ok) {
                setArticle(response.article);
            } else {
                setErrorMessage(`Error: ${response.message}`);
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
                        <td>{article.title}</td>
                        <td><img className="d-flex" src={article.imageUrl} alt={article.title} width="300" height="300" /></td>
                        <td>{article.description}</td>
                        <td>{article.rating}</td>
                        <td>
                            <a href={`/article/edit/${article._id}`} className="text-white">Update</a>
                            <br/>
                            <a href={`/article/${article._id}`} className="text-white">Delete</a>
                        </td>
                    </tbody>
                </table>
            </div>
            : <h3 className="text-danger text-center"> {errorMessage} </h3>
    );
}
export default Details;