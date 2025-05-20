import { Movie } from "@/types/Movie";

interface HeroSectionProps {
  movie: Movie;
}

export default function HeroSection({ movie }: HeroSectionProps) {
  const year = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : '';
  
  // URL de la imagen de fondo
  const backgroundUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  return (
    <div className="relative h-[50vh] md:h-[70vh] w-full rounded-xl">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center rounded-xl" 
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
    
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-movie-background to-transparent" />
      
      {/* Contenido del hero */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-3xl">
        <div className="flex items-center space-x-4 mb-3 text-gray-300">
          <div className="flex items-center text-movie-rating">
            <span className="font-bold mr-1">{movie.vote_average.toFixed(1)}</span>
            <span className="text-sm">/ 10</span>
          </div>
          <span className="text-sm">{year}</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-shadow text-white">{movie.title}</h1>
        
        <p className="text-sm md:text-base text-white/80 mb-6 line-clamp-2 md:line-clamp-3">
          {movie.overview}
        </p>
        
      </div>
    </div>
  );
}