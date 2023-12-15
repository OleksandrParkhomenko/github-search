// src/services/githubApollo.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { IGitHubSearchEdge } from '../models/IGitHubSearchEdge';

const GITHUB_API_BASE_URL = 'https://api.github.com/graphql';
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

interface SearchResultItemConnection {
  __typename: string;
  repositoryCount: number;
  edges: IGitHubSearchEdge[];
}

const client = new ApolloClient({
  uri: GITHUB_API_BASE_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: {
            merge(
              existing: SearchResultItemConnection,
              incoming: SearchResultItemConnection
            ) {
              const { edges: existingEdges = [] } = existing || {};
              const { edges: incomingEdges = [] } = incoming;

              const mergedEdges = [...existingEdges, ...incomingEdges].reduce(
                (acc, edge) => {
                  if (!acc.find((item) => item.node.id === edge.node.id)) {
                    acc.push(edge);
                  }
                  return acc;
                },
                [] as IGitHubSearchEdge[]
              );

              return {
                ...incoming,
                edges: mergedEdges,
              };
            },
          },
        },
      },
    },
  }),
  headers: {
    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
  },
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  }
});

export default client;
