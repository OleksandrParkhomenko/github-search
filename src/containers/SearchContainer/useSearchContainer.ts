// src/containers/SearchContainer/useSearchContainer.ts
import { useState } from 'react';

interface UseSearchContainerProps {
  onSearch: (query: string) => void;
}

const useSearchContainer = ({ onSearch }: UseSearchContainerProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]); // Replace with the actual type for GitHub repositories

  const handleSearch = async () => {
    // TODO: Implement the logic to fetch GitHub repositories based on the searchQuery
    const mockApiCall = () => Promise.resolve([`${searchQuery}-repo1`, `${searchQuery}-repo2`, `${searchQuery}-repo3`]);

    try {
      const results = await mockApiCall();
      setSearchResults(results);
      onSearch(searchQuery); 
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return { searchQuery, setSearchQuery, searchResults, handleSearch };
};

export default useSearchContainer;
