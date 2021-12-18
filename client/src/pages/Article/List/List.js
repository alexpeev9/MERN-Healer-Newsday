import { useEffect, useState } from "react"

import { getAllService } from "../../../services/articleService";

const List = () => {
    const [articles, setArticles] = useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        const getArticles = async () => {
            const response = await getAllService();
    
            if (response.ok) {
                setArticles(response.articles);
            } else {
                setErrorMessage(`Error: ${response.message}`);
            }
        }
        getArticles();
    }, [])
    return (
            articles ?
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
                                    <td><a href={`/article/${a._id}`} className="nav-item nav-link active">User List</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <h3 className="text-danger text-center"> {errorMessage} </h3>
        );
}
export default List;