import { Navigate } from 'react-router-dom';

import { removeCookies } from '../../../utils/cookieUtils.js';
import { logoutUser } from '../../../services/userService';

const Logout = () => {
    removeCookies();
    logoutUser();
    return <Navigate to="/" replace={true} />;
};

export default Logout;