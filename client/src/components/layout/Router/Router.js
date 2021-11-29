import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Error from '../../../pages/Error';
import Register from '../../../pages/Register';
import Login from '../../../pages/Login';
import Home from '../../../pages/Home';

import Logout from '../../auth/Logout';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Error />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;