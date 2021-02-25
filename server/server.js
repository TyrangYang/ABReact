const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

const typeDefs = gql`
    type Currency {
        amount: Int!
        currency: String!
        precision: Int!
    }

    type User {
        id: ID!
        name: String!
    }

    type Bill {
        id: ID!
        payerId: ID!
        amount: Currency!
        participants: [User]!
        date: String!
    }
    type Query {
        oneUser(id: ID!): User
        allUsers: [User]
        allBills: [Bill]
    }
`;

const resolvers = {
    Query: {
        oneUser: async (parent, args) => {
            let { data } = await axios.get(
                `http://localhost:3004/allUsers/${args.id}`
            );
            return data;
        },
        allUsers: async (parent, args) => {
            let { data } = await axios.get('http://localhost:3004/allUsers');
            return data;
        },
        allBills: async (parent, args) => {
            let { data } = await axios.get('http://localhost:3004/allBills');
            return data;
        },
    },

    Bill: {
        participants: (parent) => {
            return parent.participantsId.map(async (userId) => {
                let { data } = await axios.get(
                    `http://localhost:3004/allUsers/${userId}`
                );
                return data;
            });
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.get('/test', (req, res) => {
    res.send('hello world');
});

app.listen({ port: 4000 }, () =>
    console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
