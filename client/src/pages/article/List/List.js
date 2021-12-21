import { useEffect, useState, useContext } from "react"
import { Link } from 'react-router-dom';

import { getListService } from "../../../services/articleService";
import { ErrorContext } from "../../../utils/Context";
const List = () => {
    const [articles, setArticles] = useState([]);
    const setError = useContext(ErrorContext)[1];

    useEffect(() => {
        const getArticles = async () => {
            const response = await getListService();

            if (response.ok) {
                setArticles(response.articles.reverse());
            } else {
                setError(`Error: ${response.message}`);
            }
        }
        getArticles();
    }, [setError])
    return (
        <>
            <div className="container">
                { articles.length !== 0 ?
                <>
                <h2><span>Our latest articles</span></h2>
                <div className="row">
                    {articles?.map((a, i) => (
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <div className="newsBox">
                            <div className="thumbnail">
                                <figure><img className="image-fixed" src={a.imageUrl} alt={a.title} /></figure>
                                <div className="caption maxheight2">
                                    <div className="box_inner">
                                        <div className="box">
                                            <p className="title"><strong>{a.title}</strong></p>
                                        </div>
                                        <p class="text-right">
                                            <Link to={`/article/${a._id}`} className="btn-inline">Details</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                </div> ))} </div> </>  : <h2><span>Our latest articles</span></h2> }
            </div>
        </>
    );
}
export default List;