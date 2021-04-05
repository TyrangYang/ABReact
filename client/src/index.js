import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './app/store';
import { Provider as ReduxProvider } from 'react-redux';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { getAccessToken, setAccessToken } from './accessToken';
const APOLLO_SERVER_URI = 'http://localhost:4000/graphql';

const httpLink = createHttpLink({
    uri: APOLLO_SERVER_URI,
    credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const accessToken = getAccessToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };
});

// Use refresh token to automatically refresh accessToken
const tokenAutoRefreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        if (!token) return true;
        try {
            const { exp } = jwtDecode(token);
            // access token expired
            if (Date.now() >= exp * 1000) return false;
            else return true;
        } catch (e) {
            return false;
        }
    },
    fetchAccessToken: () => {
        // use refresh token to refetch
        return fetch('http://localhost:4000/refresh_token', {
            method: 'post',
            credentials: 'include',
        });
    },
    handleFetch: (accessToken) => {
        setAccessToken(accessToken);
    },

    handleError: (err) => {
        console.warn('Your refresh token is invalid. Try to re-login');
        console.warn(err);
    },
});

const client = new ApolloClient({
    // uri: APOLLO_SERVER_URI,
    cache: new InMemoryCache(),
    link: ApolloLink.from([tokenAutoRefreshLink, authLink, httpLink]),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
