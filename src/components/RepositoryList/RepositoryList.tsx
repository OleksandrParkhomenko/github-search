// src/components/FavoritesList/FavoritesList.tsx
import React from 'react';
import { IFavoriteGitHubRepository } from '../../models/IFavoriteGitHubRepository';
import RepositoryListItem from '../RepositoryListItem/RepositoryListItem';

interface RepositoryListProps {
  repositories: IFavoriteGitHubRepository[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  return (
    <div>
      {repositories.map((repository) => (
        <RepositoryListItem key={repository.id} repository={repository} />
      ))}
    </div>
  );
};

export default RepositoryList;
