const express = require('express');
const path = require('path');

function expressConfig(app) {
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    if(process.env.NODE_ENV == "production")
    {
        app.use(express.static(path.join(__dirname,'../../../','/client/build/')));
    }
    app.use((req, res, next) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     if (req.method === 'OPTIONS') {
         res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
         return res.status(200).json({});
     }
     next();
});
}

module.exports = expressConfig;