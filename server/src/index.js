const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const port = process.env.PORT;

const getConnectionString = () => {
    if (process.env.NODE_ENV == "production") {
        return process.env.DB_HOST_PROD;
    }
    else {
        return process.env.DB_HOST_DEV;
    }
}

const routes = require('./routes');
const { initDatabase } = require('./config/databaseConfig');

const app = express();

require('./config/expressConfig')(app);
app.use(routes);

initDatabase(getConnectionString())
    .then(() => {
        app.listen(port, () => console.log(`The app is running on http://localhost:${port}`));
    })
    .catch(err => {
        console.log('Cannot connect to database', err);
    })