import { useEffect, useState } from "react"

import { getUserList } from "../../services/userService";
// import Spinner from "../../components/shared/Spinner";

const UserList = () => {
    const [users, setUsers] = useState();
    const [errorMessage, setErrorMessage] = useState();
    // const [isLoaded, setLoad] = useState({ value: false });
    useEffect(() => {
        const getUsers = async () => {
            const response = await getUserList();
            // setLoad(true);

            if (response.ok) {
                setUsers(response.users);
            } else {
                setErrorMessage(`Error: ${response.message}`);
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
                : <h3 className="text-danger text-center"> {errorMessage} </h3>
        );
}
export default UserList;