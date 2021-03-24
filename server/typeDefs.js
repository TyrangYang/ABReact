const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        id: ID!
        email: String!
        name: String!
        password: String!
        eventIDs: [ID]!
        involverIDs: [ID]!
        events: [Event]
        involvers: [Involver]
        refetch: Query
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
        refetch: Query
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
        getEventID: ID
        getUserID: ID
        getUserInfoByID: User
        getEventInfoByID(eventID: ID!): Event
        getInvolversInUser: [Involver]
        getInvolversInEvent(eventID: ID!): [Involver]
        getBillsInEvent(eventID: ID!): [Bill]
    }

    input CurrencyObject {
        amount: Int!
        currency: String!
        precision: Int!
    }

    type LoginResponse {
        accessToken: String!
    }

    type Mutation {
        userLogin(email: String!, password: String!): LoginResponse
        createUser(email: String, name: String): User
        createNewEvent(
            eventOwnerID: ID!
            eventName: String!
            eventCreateDate: String
        ): Event
        createNewInvolverToUser(involverName: String!): Involver
        involverJoinEvent(involverID: ID!, eventID: ID!): Involver
        addNewBillToEvent(
            eventID: ID!
            payerID: ID!
            amount: CurrencyObject!
            participantsID: [ID]!
            date: String
        ): Bill

        removeBillFromEvent(eventID: ID!, billID: ID!): Bill
        involverLeaveEvent(eventID: ID!, involverID: ID!): Boolean
    }
`;
