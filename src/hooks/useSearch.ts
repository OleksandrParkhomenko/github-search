// src/hooks/useSearch.ts
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../services/githubQueries';
import { IGitHubSearchResponse } from '../models/IGitHubSearchResponse';
import { IGitHubRepository } from '../models/IGitHubRepository';
import { useDebounce } from '../utils/useDebounce';
import { IGitHubSearchEdge } from '../models/IGitHubSearchEdge';


interface ISearchResult {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  repositories: IGitHubRepository[];
  loading: boolean;
  called: boolean;
  error: Error | undefined;
  hasMore: boolean;
  onLoadMore: () => void;
}

const useSearch = (): ISearchResult => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchRepositories, { called, error, data, fetchMore }] = useLazyQuery<IGitHubSearchResponse>(SEARCH_REPOSITORIES);
  const [repositories, setRepositories] = useState<IGitHubRepository[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>('');

  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500)

  useEffect(() => {
    if (debouncedSearchQuery.length <= 2) return;
    setLoading(true);
    searchRepositories({ variables: { query: debouncedSearchQuery, first: 10 } })
      .then((result) => {
        if (!result.data || !result.data.search) return;
        const repositories = result.data.search.edges.map((edge: IGitHubSearchEdge) => edge.node);
        setRepositories(repositories);
        setHasMore(result.data.search.pageInfo.hasNextPage);
        setEndCursor(result.data.search.pageInfo.endCursor);
      })
      .finally(() => {
        setLoading(false);
      });
    
  // eslint-disable-next-line
  }, [debouncedSearchQuery]);

  const onLoadMore = async () => {
    if (!fetchMore || !data || !hasMore) return;
    setLoading(true);
    const result = await fetchMore({
      variables: { query: searchQuery, first: 10, after: endCursor },
    });
    if (result.data && result.data.search) {
      const newRepositories = result.data.search.edges.map((edge: IGitHubSearchEdge) => edge.node);
      setRepositories((previousRepositories) => [...previousRepositories, ...newRepositories]);
      setHasMore(result.data.search.pageInfo.hasNextPage);
      setEndCursor(result.data.search.pageInfo.endCursor);
    }
    setLoading(false);
  };

  return { searchQuery, setSearchQuery, repositories, loading, called, error, hasMore, onLoadMore };
};

export default useSearch;
