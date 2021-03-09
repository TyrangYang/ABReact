const databaseConfig = require('./databaseConfig.json');
const mongoose = require('mongoose');

module.exports = {
    connect: async () => {
        console.log('----database connection running----');
        mongoose.connect(databaseConfig.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        db.once('open', () => {
            console.log('----connected to database----'.toUpperCase());
        });
    },

    drop: () => {
        mongoose.connection.db.dropCollection('bill');
    },

    close: () => {
        mongoose.connection.close(() => {
            console.log('----close----');
        });
    },
};
