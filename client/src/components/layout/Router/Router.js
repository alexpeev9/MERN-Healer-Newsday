import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Spinner from "../../shared/Spinner"

const Error = lazy(() => import('../../../pages/Error'));
const Register = lazy(() => import('../../../pages/Register'));
const Login = lazy(() => import('../../../pages/Login'));
const Home = lazy(() => import('../../../pages/Home'));
const UserList = lazy(() => import('../../../pages/UserList'));
const Logout = lazy(() => import('../../auth/Logout'));
const CreateArticle = lazy(() => import('../../../pages/articlei/Create'));
const DetailsArticle = lazy(() => import('../../../pages/articlei/Details'));
const UpdateArticle = lazy(() => import('../../../pages/articlei/Update'));

const Router = () => {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default Router;