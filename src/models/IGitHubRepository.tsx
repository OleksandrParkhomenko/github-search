// src/models/IGitHubRepository.ts
export interface IGitHubRepository {
  id: string;
  name: string;
  description: string;
  url: string;
  owner: {
    login: string;
  };
  primaryLanguage: {
    name: string;
    color: string;
  };
}
  
