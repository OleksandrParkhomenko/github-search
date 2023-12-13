// src/containers/SearchContainer/useSearchContainer.ts
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../../../services/githubQueries';
import { IGitHubSearchResponse } from '../../../models/IGitHubSearchResponse';
import { IGitHubRepository } from '../../../models/IGitHubRepository';
import { debounce } from '../../../utils/debounce';


interface UseSearchContainerResult {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: IGitHubRepository[];
  loading: boolean;
  error: Error | undefined;
  handleSearch: () => void;
  hasMore: boolean;
  onLoadMore: () => void;
}

const useSearchContainer = (): UseSearchContainerResult => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchRepositories, { error, data, fetchMore }] = useLazyQuery<IGitHubSearchResponse>(SEARCH_REPOSITORIES);
  const [searchResults, setSearchResults] = useState<IGitHubRepository[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const delayedSearch = debounce(async () => {
    setLoading(true);
    await searchRepositories({ variables: { query: searchQuery, first: 10 } });
    console.log('test');
    setLoading(false);
  }, 500);

  const handleSearch = () => {
    delayedSearch();
  };

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

  return { searchQuery, setSearchQuery, searchResults, loading, error, handleSearch, hasMore, onLoadMore };
};

export default useSearchContainer;
