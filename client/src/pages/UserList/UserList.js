import { useEffect, useState } from "react"
import { getUserList } from "../../services/userService";

const UserList = () => {
    const [users, setUsers] = useState()
    useEffect(() => {
        const getUsers = async () => {
            const data = await getUserList()
            setUsers(data);
        }
        getUsers();
    }, [])
    return (
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
                    {users?.map((u,i) => (
                        <tr key={u._id}>
                            <td>{i+1}</td>
                            <td>{u.username}</td>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default UserList;