import { useEffect, useState } from "react"

import { UserContext, ErrorContext } from "../../../utils/Context"
import GlobalError from "../../error/GlobalError"
import Header from "../Header"
import Router from "../Router"
import Footer from "../Footer"
import { getUsernameCookie } from '../../../utils/cookieUtils.js';

let timeout = 0

const Layout = () => {
    const [username, setUsername] = useState(getUsernameCookie());
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            setUsername(getUsernameCookie());
        } catch (e) {
            setUsername(null);
        }
    }, [])

    useEffect(() => {
        if (error !== '') {
            timeout = setTimeout(() => setError(''), 8000)
        } else {
            clearTimeout(timeout)
        }
    }, [error, username])

    return (
        <UserContext.Provider value={[username, setUsername]}>
            <ErrorContext.Provider value={[error, setError]}>
                <Header user={username} />
                <GlobalError error={error} />
                <Router />
                <Footer />
            </ErrorContext.Provider >
        </UserContext.Provider >
    );
}

export default Layout;