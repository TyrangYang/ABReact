const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        id: ID!
        email: String!
        name: String!
        eventIDs: [ID]!
        involverIDs: [ID]!
        events: [Event]
        involvers: [Involver]
    }

    type Event {
        id: ID!
        eventOwnerID: ID!
        eventName: String!
        eventCreateDate: String!
        allBillIDs: [ID]!
        allInvolverIDs: [ID]!
        allBills: [Bill]
        allInvolvers: [Involver]
        eventOwner: User
    }

    type Involver {
        id: ID!
        name: String!
        joinedEventIDs: [ID]!
        joinedUserID: ID!
        joinedEvents: [Event]
        joinedUser: [User]
    }

    type Currency {
        amount: Int!
        currency: String!
        precision: Int!
    }

    type Bill {
        id: ID!
        payerID: ID!
        amount: Currency!
        date: String!
        participantsID: [ID]!
        payer: Involver
        participants: [Involver]
    }

    type Query {
        getAllUsers: [User]
        getAllEvents: [Event]
        getAllInvolver: [Involver]
        getAllBill: [Bill]
    }

    input CurrencyObject {
        amount: Int!
        currency: String!
        precision: Int!
    }

    type Mutation {
        createUser(email: String, name: String): User
        createNewEvent(
            eventOwnerID: ID!
            eventName: String!
            eventCreateDate: String
        ): Event
        joinNewInvolver(userID: ID!, involverName: String!): Involver
        involverJoinEvent(involverID: ID!, eventID: ID!): Boolean
        addNewBillToEvent(
            eventID: ID!
            payerID: ID!
            amount: CurrencyObject!
            participantsID: [ID]!
            date: String
        ): Bill

        removeEvent(eventID: ID!): Event
        removeBillFromEvent(eventID: ID!, billID: ID!): Boolean
        removeInvolverFromEvent(eventID: ID!, involverID: ID!): Boolean
    }
`;
