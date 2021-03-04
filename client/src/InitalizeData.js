const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

client
    .query({
        query: gql`
            query bill {
                getAllBill {
                    id
                    payer {
                        name
                    }
                    participants {
                        name
                    }
                    date
                    amount {
                        amount
                        currency
                        precision
                    }
                }
            }
        `,
    })
    .then((res) => console.log(res));
