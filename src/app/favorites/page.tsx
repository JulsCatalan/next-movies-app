'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Film } from 'lucide-react';
import { Movie } from '@/types/Movie';


export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Carga fav movies desde el localstorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadFavorites = () => {
        try {
          const favoritesStr = localStorage.getItem('favoriteMovies');

          if (favoritesStr) {
            const parsedFavorites = JSON.parse(favoritesStr);
            if (Array.isArray(parsedFavorites)) {
              setFavorites(parsedFavorites);
            } else {
              setFavorites([]);
            }
          } else {
            setFavorites([]);
          }
        } catch (error) {
          console.error('Error al cargar favoritos:', error);
          setFavorites([]);
        }
      };

      loadFavorites();

      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'favoriteMovies') {
          loadFavorites();
        }
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  // Eliminar película de favoritos
  const removeFavorite = (movieId: number) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Mis Películas Favoritas</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {favorites.map(movie => (
            <div 
              key={movie.id}
              className="relative overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 rounded-lg group"
            >
              <div className="relative aspect-[2/3] w-full">
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-zinc-800">
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <Film size={40} className="text-gray-400 mb-2" />
                      <span className="text-gray-300 font-medium text-sm line-clamp-3">{movie.title}</span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="font-medium text-white text-lg mb-1 line-clamp-2">
                    {movie.title}
                  </h3>

                  <button
                    onClick={() => removeFavorite(movie.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-red-400 hover:bg-black/70 transition-colors"
                    aria-label="Eliminar de favoritos"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 min-h-[70vh] px-4">
          <Heart size={64} className="text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2 text-center">No tienes películas favoritas</h2>
          <p className="text-gray-500 mb-6 text-center">
            Explora el catálogo y agrega películas a tus favoritos para verlas aquí.
          </p>
        </div>
      )}
    </div>
  );
}
