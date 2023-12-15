// src/models/IGitHubSearchEdge.ts
import { IGitHubRepository } from "./IGitHubRepository";

export interface IGitHubSearchEdge {
  cursor: string;
  node: IGitHubRepository;
}
  