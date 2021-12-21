import { useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../../utils/Context.js';
import { removeCookies } from '../../../utils/cookieUtils.js';
import { logoutUser } from '../../../services/userService';

const Logout = () => {
    const navigate = useNavigate();
    const setUsername = useContext(UserContext)[1];

    useEffect(() => {
        const logout = async() => {
            await logoutUser();
            setUsername('');
            removeCookies();
            navigate('/');
        }
        logout();
    }, [navigate, setUsername])

    return null;
};

export default Logout;