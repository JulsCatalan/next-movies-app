'use client';

import { useState, useEffect } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface FavoriteButtonProps {
  movie: Movie;
  className?: string;
}

export default function FavoriteButton({ movie, className = '' }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Comprobar si la película está en favoritos al cargar el componente
  useEffect(() => {
    const favoritesStr = localStorage.getItem('favoriteMovies');
    if (favoritesStr) {
      try {
        const favorites = JSON.parse(favoritesStr);
        setIsFavorite(favorites.some((fav: Movie) => fav.id === movie.id));
      } catch (e) {
        console.error('Error al cargar favoritos:', e);
      }
    }
  }, [movie.id]);
  
  // Manejar el clic en el botón de favorito
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que el clic se propague al contenedor
    
    const favoritesStr = localStorage.getItem('favoriteMovies');
    let favorites: Movie[] = [];
    
    if (favoritesStr) {
      try {
        favorites = JSON.parse(favoritesStr);
      } catch (e) {
        console.error('Error al analizar favoritos:', e);
      }
    }
    
    if (isFavorite) {
      favorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      favorites.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
      });
    }
    
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };
  
  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors ${
        isFavorite 
          ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' 
          : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
      } ${className}`}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor" 
        className="w-5 h-5"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
}