const databaseConfig = require('./databaseConfig.json');
const mongoose = require('mongoose');

module.exports = () => {
    console.log('----database connection running----');
    mongoose.connect(
        'mongodb+srv://admin-1:uUxgwyFXzOU570hh@cluster-test.uwpz5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    const db = mongoose.connection;
    db.once('open', () => {
        console.log('----connected to database----'.toUpperCase());
    });
};
