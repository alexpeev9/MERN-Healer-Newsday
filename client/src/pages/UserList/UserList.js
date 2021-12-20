import { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import { getUserList } from "../../services/userService";
import { ErrorContext } from "../../utils/Context";

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState();
    const setError = useContext(ErrorContext)[1]
    useEffect(() => {
        const getUsers = async () => {
            const response = await getUserList();

            if (response.ok) {
                setUsers(response.users);
            } else {
                setError(`Error: ${response.message}`);
                return navigate('/');
            }
        }
        getUsers();
    }, [])
    return (
            users ?
                <div className="container">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((u, i) => (
                                <tr key={u._id}>
                                    <td>{i + 1}</td>
                                    <td>{u.username}</td>
                                    <td>{u.firstName}</td>
                                    <td>{u.lastName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <h3 className="text-danger text-center"> ..Loading </h3>
        );
}
export default UserList;