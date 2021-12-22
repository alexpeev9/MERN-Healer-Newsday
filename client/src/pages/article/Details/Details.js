import { useEffect, useContext, useState } from "react"
import { useParams, useNavigate, Link } from 'react-router-dom';

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
        const response = await upVoteService(articleId);
        if (response.ok) {
            setRating(article.rating += 1);
            setVoted(true);
        } else {
            setError(`${response.message}`);
            return navigate('/login');
        }
    }
    const downvoteArticle = async () => {
        const response = await downVoteService(articleId);
        if (response.ok) {
            setRating(article.rating -= 1);
            setVoted(true);
        } else {
            setError(`${response.message}`);
            return navigate('/login');
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
            <section className="container" >
                <div className="row">
                    <section className="col-12 maincontent">
                        <h1 className="text-center">{article.title}</h1>
                        <span>
                            <p>Author: {article.creator.firstName} {article.creator.lastName} ({article.creator.username})</p>
                            <img src={article.imageUrl} alt={article.title} className="img-rounded pull-right" width="300" />
                            <p>{article.description}</p>
                        </span>
                        <section className="col-12 maincontent">
                            <h3>Rating: {rating}</h3>
                            {(article.votes.length !== 0) ? (
                                <>
                                    <h3>This article was voted by:</h3>
                                    {article.votes.map((v) => (
                                        <p key={v._id}>{v.firstName} {v.lastName} - {v.username}</p>
                                    ))}
                                </>) : (<></>)}
                        </section>
                    </section>
                </div>
                <div className="row">
                    <nav id="filter" className="text-center">
                        <ul>
                            {(creator) ? (
                                <>
                                    <li><button className="btn"><Link to={`/article/edit/${article._id}`} className="white-text-1">Edit</Link></button></li>
                                </>) :
                                (<></>)}
                            {(creator || isAdmin === "true") ? (
                                <>
                                    <li> <button className="btn" onClick={deleteArticle}>Delete</button></li>
                                </>) :
                                (<></>)}
                            {(!voted) ? (
                                <>
                                    <li><button className="btn" onClick={upvoteArticle}><i className="fa fa-thumbs-up"></i></button></li>
                                    <li> <button className="btn" onClick={downvoteArticle}><i className="fa fa-thumbs-down"></i></button></li>
                                </>) :
                                (<></>)}
                        </ul>
                    </nav>
                </div>
            </section > : <h3> This article does not exist! </h3>
    );
}
export default Details;
