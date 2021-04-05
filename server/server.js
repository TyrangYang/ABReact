require('dotenv').config();
const express = require('express');
const { connect: databaseConnect } = require('./database/dbConnection');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolver');
const typeDefs = require('./typeDefs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
const { userModel } = require('./database/model');
const { createAccessToken } = require('./authToken');

(async () => {
    /* database connection  */
    await databaseConnect();

    /* set up express */

    const app = express();

    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    app.use(cookieParser());

    app.get('/test', (req, res) => {
        res.send('hello world');
    });

    app.post('/refresh_token', async (req, res) => {
        const refreshToken = req.cookies.jid;
        if (!refreshToken) return res.send({ ok: false, accessToken: '' });

        try {
            let payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await userModel.findById({ _id: payload.userID });

            //  check token version
            if (user.tokenVersion !== payload.tokenVersion) throw new Error('token expired');

            return res.send({ ok: true, accessToken: createAccessToken(user) });
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, accessToken: '' });
        }
    });

    /* set up apollo server */

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => {
            return { req, res };
        },
    });
    server.applyMiddleware({ app, cors: false });

    app.listen({ port: 4000 }, () =>
        console.log('Now browse to http://localhost:4000' + server.graphqlPath)
    );
})();
