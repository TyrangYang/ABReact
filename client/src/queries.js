import { gql } from '@apollo/client';

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
        getEventInfoByID(eventID: $eventID) {
            allInvolvers {
                id
                name
                joinedEventIDs
            }
        }
    }
`;

export const GET_INVOLVERS_IN_GIVEN_USER_BY_USER_ID = gql`
    query($userID: ID!) {
        getUserInfoByID(userID: $userID) {
            involvers {
                id
                name
                joinedEventIDs
            }
        }
    }
`;
