import { useContext } from "react"
import { Navigate } from 'react-router-dom';

import { removeCookies } from '../../../utils/cookieUtils.js';
import { UserContext } from '../../../utils/Context.js';

const Logout = () => {
    const [username, setUsername] = useContext(UserContext)
    removeCookies();
    setUsername(username);
    return <Navigate to="/" replace={true} />;
};

export default Logout;