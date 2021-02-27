const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolver');
const typeDefs = require('./typeDefs');

module.exports = {
    server: new ApolloServer({ typeDefs, resolvers }),
};
