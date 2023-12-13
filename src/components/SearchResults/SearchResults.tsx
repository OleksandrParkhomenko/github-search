// src/components/SearchResults/SearchResults.tsx
import React from 'react';
import { IGitHubRepository } from '../../models/IGitHubRepository';

interface SearchResultsProps {
  searchResults: IGitHubRepository[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
