// src/services/githubApollo.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const GITHUB_API_BASE_URL = 'https://api.github.com/graphql';
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

const client = new ApolloClient({
  uri: GITHUB_API_BASE_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
  },
});

export default client;
