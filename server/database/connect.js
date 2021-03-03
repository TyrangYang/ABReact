const databaseConfig = require('./databaseConfig.json');
const mongoose = require('mongoose');

module.exports = () => {
    console.log('----database connection running----');
    mongoose.connect(databaseConfig.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.once('open', () => {
        console.log('----connected to database----'.toUpperCase());
    });
};
