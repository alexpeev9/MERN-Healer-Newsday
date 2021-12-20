import { useEffect, useContext, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';

import { getOneService, deleteOneService, upVoteService, downVoteService } from "../../../services/articleService";
import { ErrorContext } from '../../../utils/Context';
import { getUserIdCookie, getUserIsAdminCookie } from '../../../utils/cookieUtils';
const Details = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState();
    const [rating, setRating] = useState(0);
    const [voted, setVoted] = useState(true);
    const [creator, setCreator] = useState(false);
    const setError = useContext(ErrorContext)[1];
    const navigate = useNavigate();
    const isAdmin = getUserIsAdminCookie();
    const deleteArticle = async () => {
        let confirmed = window.confirm('Are you sure you want to delete this article?');
        if (confirmed) {
            const response = await deleteOneService(articleId);
            if (response.ok) {
                return navigate('/');
            } else {
                setError(`Error: ${response.message}`);
            }
        }
    }
    const upvoteArticle = async () => {
        let confirmed = window.confirm('Are you sure you want to upvote this article?');
        if (confirmed) {
            const response = await upVoteService(articleId);
            if (response.ok) {
                setRating(article.rating += 1);
                setVoted(true);
                window.alert("Success!");
            } else {
                setError(`Error: ${response.message}`);
            }
        }
    }
    const downvoteArticle = async () => {
        let confirmed = window.confirm('Are you sure you want to downvote this article?');
        if (confirmed) {
            const response = await downVoteService(articleId);
            if (response.ok) {
                setRating(article.rating -= 1);
                setVoted(true);
                window.alert("Success!");
            } else {
                setError(`Error: ${response.message}`);
                return navigate('/');

            }
        }
    }

    useEffect(() => {
        const getArticle = async () => {
            const response = await getOneService(articleId);
            const userId = getUserIdCookie();
            if (response.ok) {
                setArticle(response.article);
                setRating(response.article?.rating);
                setVoted(response.article?.votes.some(u => u._id === userId) || response.article?.creator._id === userId);
                setCreator(response.article?.creator._id === userId);
            } else {
                setError(`Error: ${response.message}`);
            }
        }
        getArticle();
    }, [articleId, setError, setVoted, setRating])
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
                            <th scope="col">Author</th>
                            <th scope="col">Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{article.title}</td>
                            <td><img className="d-flex" src={article.imageUrl} alt={article.title} width="300" height="300" /></td>
                            <td>{article.description}</td>
                            <td>{rating}</td>
                            <td>{article.creator.firstName} {article.creator.lastName} </td>
                            <td>
                                {(creator) ? (
                                    <>
                                        <a href={`/article/edit/${article._id}`}><button>Update</button></a>
                                    </>) :
                                    (<></>)}
                                {(creator || isAdmin === "true") ? (
                                    <>
                                        <button onClick={deleteArticle}>Delete</button>
                                    </>) :
                                    (<></>)}
                                {(!voted) ? (
                                    <>
                                        <button onClick={upvoteArticle}>UpVote</button>
                                        <button onClick={downvoteArticle}>DownVote</button>
                                    </>) :
                                    (<></>)}
                            </td>
                            <td>
                                {article.votes.map((v) => (
                                    <p key={v._id}>a {v._id}</p>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            : <h3 className="text-danger text-center"> This article does not exist! </h3>
    );
}
export default Details;