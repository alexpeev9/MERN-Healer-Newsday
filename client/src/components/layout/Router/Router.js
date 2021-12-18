import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Error from '../../../pages/Error';
import Register from '../../../pages/Register';
import Login from '../../../pages/Login';
import Home from '../../../pages/Home';
import UserList from '../../../pages/UserList';
import Logout from '../../auth/Logout';
import CreateArticle from '../../../pages/Article/Create';
import DetailsArticle from '../../../pages/Article/Details';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/article/create" element={<CreateArticle />} />
                <Route path="/article/:articleId" element={<DetailsArticle />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;