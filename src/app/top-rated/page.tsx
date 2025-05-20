import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import HeroSection from '@/components/HeroSection';
import { getTopRatedMovies } from '@/services/tmdb-api';
import { Movie } from '@/types/Movie';

// Componente de paginaciónn
function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  
  const maxPages = Math.min(totalPages, 100);
  
  const getPageNumbers = () => {
    
    if (maxPages <= 7) {
      return Array.from({ length: maxPages }, (_, i) => i + 1);
    }
    
    // Cerca del inicio
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', maxPages];
    }
    
    // Cerca del final
    if (currentPage >= maxPages - 3) {
      return [1, '...', maxPages - 4, maxPages - 3, maxPages - 2, maxPages - 1, maxPages];
    }
    
    // En medio
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', maxPages];
  };
  
  const pages = getPageNumbers();
  
  return (
    <div className="flex justify-center items-center mt-10 gap-1">
      {/* Botón anterior */}
      {currentPage > 1 && (
        <Link
          href={`/top-rated?page=${currentPage - 1}`}
          className="h-10 w-10 flex items-center justify-center rounded-full font-bold text-white hover:bg-movie-accent transition-colors"
          aria-label="Página anterior"
        >
          &laquo;
        </Link>
      )}
      
      {/* Números de página */}
      <div className="flex gap-1">
        {pages.map((page, index) => (
          <div key={index}>
            {typeof page === 'number' ? (
              <Link
                href={`/top-rated?page=${page}`}
                className={`h-10 w-10 flex items-center justify-center rounded-full 
                  ${currentPage === page 
                    ? 'bg-purple-active text-white' 
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                  } transition-colors`}
              >
                {page}
              </Link>
            ) : (
              <span className="h-10 w-10 flex items-center justify-center text-white/40">
                {page}
              </span>
            )}
          </div>
        ))}
      </div>
      
      {/* Botón siguiente */}
      {currentPage < maxPages && (
        <Link
          href={`/top-rated?page=${currentPage + 1}`}
          className="h-10 w-10 flex items-center justify-center rounded-full font-bold text-white hover:bg-movie-accent transition-colors"
          aria-label="Página siguiente"
        >
          &raquo;
        </Link>
      )}
    </div>
  );
}

export default async function TopRatedMoviesPage({ searchParams }: any) {
  
  const currentPage = parseInt(searchParams?.page || '1', 10);
  
  const moviesData = await getTopRatedMovies(currentPage);
  
  const featuredMovie = currentPage === 1 ? moviesData.results[0] : null;
  
  const gridMovies = currentPage === 1 
    ? moviesData.results.slice(1) 
    : moviesData.results;

  return (
    <div className="min-h-screen pt-6">
      {/* Hero Section */}
      {featuredMovie && <HeroSection movie={featuredMovie} />}
      
      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">
            Películas Mejor Rankeadas
          </h1>
          <div className="px-3 py-1 rounded-full text-white/60 text-sm">
            Página {currentPage} de {Math.min(moviesData.total_pages, 100)}
          </div>
        </div>
        
        {/* Grid de películas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {gridMovies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {/* Paginación */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={moviesData.total_pages} 
        />
      </div>
    </div>
  );
}