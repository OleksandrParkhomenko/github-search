// src/containers/SearchContainer/useSearchContainer.ts
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../../services/githubQueries';
import { IGitHubSearchResponse } from '../../models/IGitHubSearchResponse';
import { IGitHubRepository } from '../../models/IGitHubRepository';

interface UseSearchContainerProps {
  onSearch: (query: string, repositories: IGitHubRepository[]) => void;
}

interface UseSearchContainerResult {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: IGitHubRepository[];
  loading: boolean;
  error: Error | undefined;
  handleSearch: () => void;
}

const useSearchContainer = ({ onSearch }: UseSearchContainerProps): UseSearchContainerResult => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchRepositories, { loading, error, data }] = useLazyQuery<IGitHubSearchResponse>(SEARCH_REPOSITORIES);
  const [searchResults, setSearchResults] = useState<IGitHubRepository[]>([]);

  const handleSearch = () => {
    searchRepositories({ variables: { query: searchQuery } });
  };

  useEffect(() => {
    if (data && data.search) {
      const repositories = data.search.edges.map((edge: any) => edge.node);
      setSearchResults(repositories);
      onSearch(searchQuery, repositories);
    }
  }, [data, searchQuery]);

  return { searchQuery, setSearchQuery, searchResults, loading, error, handleSearch };
};

export default useSearchContainer;
