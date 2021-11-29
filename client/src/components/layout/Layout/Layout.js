import { useEffect, useState } from "react"

import { UserContext } from "../../../utils/Context"
import Header from "../Header"
import Router from "../Router"
import Footer from "../Footer"
import { getUsernameCookie } from '../../../utils/cookieUtils.js';

const Layout = () => {
    const [username, setUsername] = useState(getUsernameCookie());
    useEffect(() => {
		try {
			setUsername(getUsernameCookie());
		} catch (e) {
			setUsername(null);
		}
	}, [username])
    return (
        <UserContext.Provider value={[username, setUsername]}>
            <Header user={username}/>
            <Router />
            <Footer />
        </UserContext.Provider >
    );
}

export default Layout;