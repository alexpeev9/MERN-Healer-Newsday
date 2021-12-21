import { lazy, Suspense, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { UserContext, ErrorContext } from "../../../utils/Context"
import Spinner from "../../shared/Spinner"
import GlobalError from "../../error/GlobalError"
import Header from "../Header"
import Footer from "../Footer"
import { getUsernameCookie } from '../../../utils/cookieUtils.js';



const Error = lazy(() => import('../../../pages/Error'));
const Register = lazy(() => import('../../../pages/Register'));
const Login = lazy(() => import('../../../pages/Login'));
const Home = lazy(() => import('../../../pages/Home'));
const UserList = lazy(() => import('../../../pages/UserList'));
const Logout = lazy(() => import('../../auth/Logout'));
const CreateArticle = lazy(() => import('../../../pages/article/Create'));
const DetailsArticle = lazy(() => import('../../../pages/article/Details'));
const UpdateArticle = lazy(() => import('../../../pages/article/Update'));

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
                <BrowserRouter>
                    <Header user={username} />
                    <GlobalError error={error} />
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/user-list" element={<UserList />} />
                            <Route path="/article/create" element={<CreateArticle />} />
                            <Route path="/article/:articleId" element={<DetailsArticle />} />
                            <Route path="/article/edit/:articleId" element={<UpdateArticle />} />
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </Suspense>
                    <Footer />
                </BrowserRouter>
            </ErrorContext.Provider >
        </UserContext.Provider >
    );
}

export default Layout;