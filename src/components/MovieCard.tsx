'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import MovieDetails from './MovieDetails';
import { Movie } from '@/types/Movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const year = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'N/A';
  
  return (
    <>
      <div 
        onClick={openModal}
        className="relative overflow-hidden shadow-md group cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-xl"
      >
        {/* Imagen de fondo */}
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
            <div className="flex items-center justify-center h-full bg-card-background">
              <Image
                src={'https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg'}
                alt='Pelicula sin Poster'
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          )}
        
          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="font-medium text-white text-lg mb-1 line-clamp-2">
              {movie.title}
            </h3>
            
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-300">{year}</p>
              <span className='flex flex-row items-center justify-center gap-x-1 text-gray-300'>{movie.vote_average.toFixed(1)} <Star size={16}/></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de detalles */}
      <MovieDetails 
        movie={movie} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
}