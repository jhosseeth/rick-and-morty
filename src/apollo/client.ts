import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Rick and Morty GraphQL API
  cache: new InMemoryCache()
});