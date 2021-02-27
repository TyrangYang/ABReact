const { gql } = require('apollo-server-express');

module.exports = gql`
    type Event {
        eventOwnerId: ID!
        eventCreateDate: String
        allBills: [Bill]!
        allInvolvers: [Involver]!
    }

    type Currency {
        amount: Int!
        currency: String!
        precision: Int!
    }

    type Involver {
        id: ID!
        name: String!
    }

    type Bill {
        id: ID!
        payerId: ID!
        amount: Currency!
        participants: [Involver]!
        date: String!
    }

    type Query {
        getEventByOwnerID(ownerID: ID!): [Event]
        oneInvolver(id: ID!): Involver
        allInvolvers: [Involver]
        allBills: [Bill]
    }
`;
