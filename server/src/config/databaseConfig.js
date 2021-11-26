const mongoose = require('mongoose');

exports.initDatabase = (connectionString) => mongoose.connect(connectionString);
