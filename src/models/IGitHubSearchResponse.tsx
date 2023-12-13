// src/models/IGitHubSearchResponse.ts
import { IGitHubRepository } from './IGitHubRepository';

export interface IGitHubSearchResponse {
  search: {
    edges: IGitHubRepository[];
  };
}
