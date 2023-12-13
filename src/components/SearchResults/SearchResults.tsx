// src/components/SearchResults/SearchResults.tsx
import React from 'react';
import { IGitHubRepository } from '../../models/IGitHubRepository';
import { useFavorites } from '../../context/FavoritesContext';

interface SearchResultsProps {
  searchResults: IGitHubRepository[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const handleFavoriteToggle = (repository: IGitHubRepository) => {
    const isFavorite = isRepositoryInFavorites(repository);
    if (isFavorite) {
      removeFavorite(repository.id);
    } else {
      addFavorite({ id: repository.id, name: repository.name });
    }
  };

  const isRepositoryInFavorites = (repository: IGitHubRepository) => {
    return favorites.some((favorite) => favorite.id === repository.id);
  };

  return (
    <div>
      <h2>Search Results</h2>
      {searchResults.map((repository) => (
        <div key={repository.id}>
          <p>{repository.name}</p>
          <button onClick={() => handleFavoriteToggle(repository)}>
            {isRepositoryInFavorites(repository) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
