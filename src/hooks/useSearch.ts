// src/hooks/useSearch.ts
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../services/githubQueries';
import { IGitHubSearchResponse } from '../models/IGitHubSearchResponse';
import { IGitHubRepository } from '../models/IGitHubRepository';
import { useDebounce } from './useDebounce';
import { IGitHubSearchEdge } from '../models/IGitHubSearchEdge';


const SEARCH_REQUEST_SIZE = 20;
const MIN_SEARCH_QUERY_LENGTH = 3;

interface ISearchResult {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  repositories: IGitHubRepository[];
  loading: boolean;
  called: boolean,
  hasMore: boolean;
  loadMore: () => void;
}

const useSearch = (): ISearchResult => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500)
  const { fetchMore, called } = useQuery<IGitHubSearchResponse>(SEARCH_REPOSITORIES, {
    fetchPolicy: 'network-only',
  });
  const [repositories, setRepositories] = useState<IGitHubRepository[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  
  const withoutDuplicates = (newRepositories: IGitHubRepository[]) =>
    newRepositories.filter(newRepository => !repositories.some(repository => repository.id === newRepository.id));
  
  const loadMore = async (isNewQuery: boolean) => {
    if (isNewQuery) {
      setRepositories([]);
      setEndCursor(null);
    }
    if (debouncedSearchQuery.length < MIN_SEARCH_QUERY_LENGTH) return
    setLoading(true);
    const result = await fetchMore({
      variables: { query: debouncedSearchQuery, first: SEARCH_REQUEST_SIZE, after: endCursor },
    });
    if (result.data && result.data.search) {
      const newRepositories = result.data.search.edges.map((edge: IGitHubSearchEdge) => edge.node);
      if (isNewQuery) {
        setRepositories(newRepositories);
      } else {
        const updatedRepositories = [...repositories, ...withoutDuplicates(newRepositories)];
        setRepositories(updatedRepositories);
      }
      setHasMore(result.data.search.pageInfo.hasNextPage);
      setEndCursor(result.data.search.pageInfo.endCursor);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadMore(true);    
  // eslint-disable-next-line
  }, [debouncedSearchQuery]);

  return { searchQuery, setSearchQuery, repositories, loading, called, hasMore, loadMore: () => loadMore(false) };
};

export default useSearch;
