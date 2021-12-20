import { useEffect, useState, useContext } from "react"

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
    console.log(articles.length);
    return (
            articles.length !== 0 ?
                <div className="container">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Image</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles?.map((a, i) => (
                                <tr key={a._id}>
                                    <td>{i + 1}</td>
                                    <td>{a.title}</td>
                                    <td><img className="d-flex" src={a.imageUrl} alt={a.title} width="300" height="300" /></td>
                                    <td><a href={`/article/${a._id}`} className="text-white">User List</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <h3 className="text-success text-center"> There are no articles yet. </h3>
        );
}
export default List;