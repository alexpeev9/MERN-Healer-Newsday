import { useContext } from "react"
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../../utils/Context.js';
import { removeCookies } from '../../../utils/cookieUtils.js';
import { logoutUser } from '../../../services/userService';

const Logout = () => {
    logoutUser();
    removeCookies();
    useContext(UserContext)[1]("");
    return <Navigate to="/" replace={true} />;
};

export default Logout;