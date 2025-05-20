'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { Movie } from '@/types/Movie';
import { motion, AnimatePresence } from 'framer-motion';

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

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Fecha desconocida';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  // Variantes de animación para el backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  // Variantes de animación para el modal
  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300, 
        duration: 0.4 
      } 
    },
    exit: { 
      scale: 0.8, 
      opacity: 0, 
      y: 20, 
      transition: { 
        duration: 0.3 
      }
    }
  };
  
  // Variantes para los elementos internos
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5
      }
    })
  };
  
  // Variante para las tarjetas de recomendación
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.3
      }
    })
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="fixed inset-0 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            ref={modalRef}
            className="bg-movie-background rounded-lg shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col z-10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Imagen de fondo */}
            <motion.div 
              className="relative h-64 w-full"
              variants={itemVariants}
              custom={0}
              initial="hidden"
              animate="visible"
            >
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
              
              {/* Botón cerrar con animación */}
              <motion.button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-black text-white p-2 rounded-full hover:bg-zinc-900 hover:cursor-pointer transition-colors"
                aria-label="Cerrar"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </motion.div>
            
            {/* Contenido principal */}
            <div className="overflow-y-auto flex-grow p-6 bg-zinc-900">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Columna izquierda */}
                <motion.div 
                  className="md:w-1/3"
                  variants={itemVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                >
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
                </motion.div>
                
                {/* Columna derecha */}
                <div className="md:w-2/3 flex flex-col relative">
                  <motion.div 
                    className='absolute right-0'
                    variants={itemVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                  >
                    <FavoriteButton movie={movie} />
                  </motion.div>

                  <motion.h1 
                    className="text-3xl font-bold mb-4 text-white"
                    variants={itemVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                  >
                    {movie.title}
                  </motion.h1>
                  
                  <motion.div 
                    className="mb-8"
                    variants={itemVariants}
                    custom={3}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="text-xl font-bold mb-3 text-white border-l-4 border-movie-accent pl-3">Sinopsis</h3>
                    <p className="text-white/80">
                      {movie.overview || 'No hay sinopsis disponible para esta película.'}
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="rounded-lg"
                    variants={itemVariants}
                    custom={4}
                    initial="hidden"
                    animate="visible"
                  >
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
                  </motion.div>
                </div>
              </div>
              
              {/* Sección de películas recomendadas */}
              <motion.div 
                className="mt-8 pt-6"
                variants={itemVariants}
                custom={5}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold mb-8 text-white border-l-4 border-movie-accent pl-3">
                  Películas Recomendadas
                </h3>
                
                {loadingRecommendations ? (
                  <div className="flex justify-center items-center py-8">
                    <motion.div 
                      className="rounded-full h-8 w-8 border-b-2 border-movie-accent"
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                    />
                  </div>
                ) : recommendations.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {recommendations.map((movie, index) => (
                      <motion.div 
                        key={movie.id}
                        className="relative rounded-lg overflow-hidden cursor-pointer transition-opacity"
                        variants={cardVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
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
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    No hay recomendaciones disponibles para esta película.
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}