// src/containers/SearchContainer/useSearchContainer.ts
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../../../services/githubQueries';
import { IGitHubSearchResponse } from '../../../models/IGitHubSearchResponse';
import { IGitHubRepository } from '../../../models/IGitHubRepository';
import { useDebounce } from '../../../utils/useDebounce';


interface UseSearchContainerResult {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: IGitHubRepository[];
  loading: boolean;
  loaded: boolean;
  error: Error | undefined;
  hasMore: boolean;
  onLoadMore: () => void;
}

const useSearchContainer = (): UseSearchContainerResult => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchRepositories, { error, data, fetchMore }] = useLazyQuery<IGitHubSearchResponse>(SEARCH_REPOSITORIES);
  const [searchResults, setSearchResults] = useState<IGitHubRepository[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500)

  useEffect(() => {
    if (debouncedSearchQuery.length > 2) {
      setLoading(true);
      searchRepositories({ variables: { query: debouncedSearchQuery, first: 10 } })
        .finally(() => {
          setLoading(false);
          if (!loaded) setLoaded(true);
        });
    }
  // eslint-disable-next-line
  }, [debouncedSearchQuery]);

  const onLoadMore = () => {
    setLoading(true);
    if (fetchMore && data && data.search.pageInfo.hasNextPage) {
      fetchMore({
        variables: { query: searchQuery, first: 10, after: data.search.pageInfo.endCursor },
      }).then((result) => {
        if (result.data && result.data.search) {
          const newRepositories = result.data.search.edges.map((edge: any) => edge.node);
          setSearchResults((prevResults) => [...prevResults, ...newRepositories]);
          setHasMore(result.data.search.pageInfo.hasNextPage);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (data && data.search) {
      const repositories = data.search.edges.map((edge: any) => edge.node);
      setSearchResults(repositories);
      setHasMore(data.search.pageInfo.hasNextPage);
    }
  }, [data, searchQuery]);

  return { searchQuery, setSearchQuery, searchResults, loading, loaded, error, hasMore, onLoadMore };
};

export default useSearchContainer;
