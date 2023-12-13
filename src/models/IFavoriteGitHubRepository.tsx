// src/models/IFavoriteGitHubRepository.ts
import { IGitHubRepository } from "./IGitHubRepository";

export interface IFavoriteGitHubRepository extends IGitHubRepository {
  rating: number;
}
    
  