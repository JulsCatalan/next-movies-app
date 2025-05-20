import Link from 'next/link';
import Image from 'next/image';
import { getUpcomingMovies, getNowPlayingMovies, getTopRatedMovies } from '@/services/tmdb-api';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/Movie';

// Componente para mostrar un slider horizontal de películas
function MovieSlider({ title, movies }: { title: string; movies: Movie[] }) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      
      {/* Contenedor con desplazamiento horizontal */}
      <div className="relative group">
        {/* Carrusel de películas */}
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory">
          {movies.map(movie => (
            <div key={movie.id} className="flex-none w-[180px] snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente de página de inicio
export default async function HomePage() {
  // Obtener datos en paralelo
  const [upcomingData, topRatedData, nowPlayingData] = await Promise.all([
    getUpcomingMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies()
  ]);
  
  // Extraer los resultados de las respuestas de la API
  const upcomingMovies = upcomingData.results.slice(0, 25);
  const topRatedMovies = topRatedData.results.slice(0, 25);
  const nowPlayingMovies = nowPlayingData.results.slice(0, 25);
  
  // Determinar la película destacada (primera película mejor valorada)
  const featuredMovie = topRatedMovies[0];
  
  return (
    <div>
      {/* Sección Hero con película destacada */}
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        {/* Background image */}
        <div className="absolute inset-0">
          {featuredMovie?.backdrop_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
              <Image
                src={'https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg'}
                alt='Pelicula sin Poster'
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        {/* Bottom fade to background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-movie-background to-transparent" />
        
        {/* Content */}
        {featuredMovie && (
          <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-3xl">
            <div className="flex items-center space-x-4 mb-3">
              <span className="bg-movie-accent py-1 px-3 text-sm font-medium rounded-full">
                Destacado
              </span>
              <div className="flex items-center text-movie-rating">
                <span className="font-bold mr-1">{featuredMovie.vote_average.toFixed(1)}</span>
                <span className="text-sm text-white/70">/ 10</span>
              </div>
              <span className="text-sm text-white/70">
                {new Date(featuredMovie.release_date).getFullYear()}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white">
              {featuredMovie.title}
            </h1>
            
            {/* Descripción */}
            <p className="text-white/80 mb-4 line-clamp-2 md:line-clamp-3">
              {featuredMovie.overview}
            </p>
            
            <div className="flex space-x-3 mt-4">
              <Link 
                href={`/movies/${featuredMovie.id}`} 
                className="bg-movie-accent hover:bg-movie-accent-hover text-white py-2 px-4 rounded-md flex items-center transition-colors"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <div className="container mx-auto px-4 py-10">
        {/* Próximos estrenos */}
        <MovieSlider 
          title="Próximos estrenos" 
          movies={upcomingMovies}
        />
        
        {/* Películas mejor valoradas */}
        <MovieSlider 
          title="Mejor valoradas" 
          movies={topRatedMovies}
        />
        
        {/* Películas en cartelera */}
        <MovieSlider 
          title="En cartelera" 
          movies={nowPlayingMovies} 
        />
      </div>
    </div>
  );
}