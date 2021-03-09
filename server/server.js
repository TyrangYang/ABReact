const express = require('express');
const { connect: databaseConnect } = require('./database/dbConnection');
const { server } = require('./apollo');

/* set up apollo server */

const app = express();
server.applyMiddleware({ app });

app.get('/test', (req, res) => {
    res.send('hello world');
});

app.listen({ port: 4000 }, () =>
    console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);

/* database connection  */
databaseConnect();
