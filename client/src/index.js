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
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const APOLLO_SERVER_URI = 'http://localhost:4000/graphql';

const httpLink = createHttpLink({
    uri: APOLLO_SERVER_URI,
    credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const accessToken = localStorage.getItem('accessToken');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };
});

const client = new ApolloClient({
    // uri: APOLLO_SERVER_URI,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
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
