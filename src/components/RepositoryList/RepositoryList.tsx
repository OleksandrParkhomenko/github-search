// src/components/RepositoryList/RepositoryList.tsx
import React from 'react';

import { IGitHubRepository } from 'models/IGitHubRepository';
import RepositoryListItem from 'components/RepositoryListItem/RepositoryListItem';

interface RepositoryListProps {
  repositories: IGitHubRepository[];
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
