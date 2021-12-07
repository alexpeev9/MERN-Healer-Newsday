const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require("cookie-parser")

const options = {
    origin: [
        `http://localhost:${process.env.CLIENTPORT}`,
        `${process.env.PRODURL}`
    ],
    credentials: true,
}
function expressConfig(app) {
    app.options("*", cors(options))
    app.use(cors(options))
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(cookieParser());

    if(process.env.NODE_ENV == "production")
    {
        app.use(express.static(path.join(__dirname,'../../../','/client/build/')));
    }
}

module.exports = expressConfig;