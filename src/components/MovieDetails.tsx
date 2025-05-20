'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { Movie } from '@/types/Movie';

interface RecommendedMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  isOpen: boolean;
}

export default function MovieDetails({ movie, onClose, isOpen }: MovieDetailsProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [recommendations, setRecommendations] = useState<RecommendedMovie[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  
  // Cargar películas recomendadas
  useEffect(() => {
    if (!isOpen || !movie) return;
    
    const fetchRecommendations = async () => {
      setLoadingRecommendations(true);
      try {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?language=es-ES`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGQ4MWU3ZmUyMWRjZWM0OTZjODQ1NjRkMDU5MTI2NCIsIm5iZiI6MTc0NzUyNjc5MS45MjgsInN1YiI6IjY4MjkyNDg3NzAxYjQwOTM2MDViNTJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9MCibluKmk5ApMI3uyrgL9F4Nez1CmSIjNWHQWpDADU'
          }
        };
        
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setRecommendations(data.results.slice(0, 6)); // Limitamos a 6 recomendaciones
      } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
        setRecommendations([]);
      } finally {
        setLoadingRecommendations(false);
      }
    };
    
    fetchRecommendations();
  }, [isOpen, movie]);
  
  // Cierra el modal cuando se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Manejar tecla Escape para cerrar el modal
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  
  if (!isOpen) return null;
  
  
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Fecha desconocida';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-movie-background rounded-lg shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col"
      >
        {/* Imagen de fondo */}
        <div className="relative h-64 w-full">
          {movie.backdrop_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover rounded-xl"
              priority
            />
          ) : (
            <div className="w-full h-full bg-card-background flex items-center justify-center">
              <div className="flex items-center justify-center h-full w-full bg-zinc-800">
              <Image
                            src={'https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg'}
                            alt='Pelicula sin Poster'
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-xl"
                          />
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          
          {/* Botón cerrar */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black text-white p-2 rounded-full hover:bg-zinc-900 hover:cursor-pointer transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Contenido principal */}
        <div className="overflow-y-auto flex-grow p-6 bg-zinc-900">
          <div className="flex flex-col md:flex-row gap-6 mb-8">

            {/* Columna izquierda */}
            <div className="md:w-1/3">
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg mb-4">
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 500px) 100vw, 500px"
                    className="object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-card-background flex items-center justify-center">
                    <div className="flex items-center justify-center h-full w-full bg-zinc-800">
                      <Image
                            src={'https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg'}
                            alt='Pelicula sin Poster'
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-xl"
                          />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Columna derecha */}
            <div className="md:w-2/3 flex flex-col relative">
              <div className='absolute right-0'>
                <FavoriteButton movie={movie} />
              </div>

              <h1 className="text-3xl font-bold mb-4 text-white">{movie.title}</h1>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3 text-white border-l-4 border-movie-accent pl-3">Sinopsis</h3>
                <p className="text-white/80">
                  {movie.overview || 'No hay sinopsis disponible para esta película.'}
                </p>
              </div>
              
              <div className="rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-white">Detalles</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-200">
                    <span className="mr-2">Estreno:</span>
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-200">
                    <span className="mr-2">Calificación:</span>
                    <span className="font-bold">{movie.vote_average.toFixed(1)} / 10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sección de películas recomendadas */}
          <div className="mt-8 pt-6">
            <h3 className="text-xl font-bold mb-8 text-white border-l-4 border-movie-accent pl-3">
              Películas Recomendadas
            </h3>
            
            {loadingRecommendations ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-movie-accent"></div>
              </div>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {recommendations.map(movie => (
                  <div 
                    key={movie.id}
                    className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="relative aspect-[2/3] w-full">
                      {movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          alt={movie.title}
                          fill
                          sizes="(max-width: 768px) 33vw, 150px"
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-zinc-800">
                          <Image
                            src={'https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg'}
                            alt='Pelicula sin Poster'
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-white line-clamp-1">{movie.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">
                No hay recomendaciones disponibles para esta película.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}