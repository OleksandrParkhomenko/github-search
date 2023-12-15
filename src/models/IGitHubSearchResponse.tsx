// src/models/IGitHubSearchResponse.ts
import { IGitHubSearchEdge } from './IGitHubSearchEdge';


export interface IGitHubSearchResponse {
  search: {
    repositoryCount: number,
    edges: IGitHubSearchEdge[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}
