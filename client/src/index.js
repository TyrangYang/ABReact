import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './app/store';
import { Provider as ReduxProvider } from 'react-redux';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const APOLLO_SERVER_URI = 'http://localhost:4000/graphql';
const client = new ApolloClient({
    uri: APOLLO_SERVER_URI,
    cache: new InMemoryCache(),

    // add refetch field to automatically update cache
    // cache: new InMemoryCache({
    //     typePolicies: {

    //     }
    // }),
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
