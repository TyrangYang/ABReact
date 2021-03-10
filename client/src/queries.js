import { gql } from '@apollo/client';

// TEMP
export const GET_USER_ID_unsafe = gql`
    query {
        getUserID
    }
`;
// TEMP
export const GET_EVENT_ID_unsafe = gql`
    query {
        getEventID
    }
`;

export const GET_USER_BY_ID = gql`
    query($userID: ID!) {
        getUserInfoByID(userID: $userID) {
            id
            name
            events {
                id
                eventName
            }
        }
    }
`;

export const GET_EVENT_BY_ID = gql`
    query($eventID: ID!) {
        getEventInfoByID(eventID: $eventID) {
            eventName
            allBills {
                id
                payer {
                    id
                    name
                }
                amount {
                    amount
                    currency
                    precision
                }
                participants {
                    id
                    name
                }
            }
            allInvolvers {
                id
                name
                joinedEventIDs
            }
        }
    }
`;

export const GET_INVOLVERS_IN_GIVEN_EVENT_BY_EVENT_ID = gql`
    query($eventID: ID!) {
        getInvolversInEvent(eventID: $eventID) {
            id
            name
            joinedEventIDs
        }
    }
`;

export const GET_INVOLVERS_IN_GIVEN_USER_BY_USER_ID = gql`
    query($userID: ID!) {
        getInvolversInUser(userID: $userID) {
            id
            name
            joinedEventIDs
        }
    }
`;

export const CREATE_NEW_INVOLVER_IN_USER = gql`
    mutation($userID: ID!, $involverName: String!) {
        joinNewInvolver(userID: $userID, involverName: $involverName) {
            id
            name
            joinedUserID
            joinedEventIDs
        }
    }
`;

export const ADD_NEW_INVOLVER_IN_EVENT = gql`
    mutation($eventID: ID!, $involverID: ID!) {
        involverJoinEvent(eventID: $eventID, involverID: $involverID) {
            id
            name
            joinedUserID
            joinedEventIDs
        }
    }
`;

export const GET_BILLS_BY_EVENT_ID = gql`
    query($eventID: ID!) {
        getBillsInEvent(eventID: $eventID) {
            id
            payer {
                name
            }
            participants {
                name
            }
            amount {
                amount
                currency
                precision
            }
            date
        }
    }
`;

export const ADD_NEW_BILL_TO_EVENT = gql`
    mutation(
        $eventID: ID!
        $payerID: ID!
        $participantsID: [ID]!
        $amount: CurrencyObject!
        $date: String
    ) {
        addNewBillToEvent(
            eventID: $eventID
            payerID: $payerID
            participantsID: $participantsID
            amount: $amount
            date: $date
        ) {
            id
            payer {
                name
            }
            participants {
                name
            }
            amount {
                amount
                currency
                precision
            }
            date
        }
    }
`;
