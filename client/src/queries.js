import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
    query {
        getUserInfoByID {
            id
            name
            events {
                id
                eventName
            }
        }
    }
`;

export const USER_LOGIN = gql`
    mutation($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            accessToken
        }
    }
`;

export const USER_LOGOUT = gql`
    mutation {
        userLogout
    }
`;

export const GET_EVENTS_FROM_USER = gql`
    query {
        getEventsFromUser {
            id
            eventName
            eventCreateDate
        }
    }
`;

export const CREATE_NEW_EVENT_TO_USER = gql`
    mutation($eventName: String!) {
        createNewEvent(eventName: $eventName) {
            id
            eventName
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
    query {
        getInvolversInUser {
            id
            name
            joinedEventIDs
        }
    }
`;

export const CREATE_NEW_INVOLVER_IN_USER = gql`
    mutation($involverName: String!) {
        createNewInvolverToUser(involverName: $involverName) {
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
                id
                name
            }
            participants {
                id
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

export const CREATE_NEW_BILL_TO_EVENT = gql`
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
                id
                name
            }
            participants {
                id
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

export const REMOVE_BILL_FROM_EVENT = gql`
    mutation($eventID: ID!, $billID: ID!) {
        removeBillFromEvent(eventID: $eventID, billID: $billID) {
            id
            payer {
                id
                name
            }
            participants {
                id
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
