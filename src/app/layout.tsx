import './globals.css';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export const metadata = {
  title: 'Next Movies App',
  description: 'Aplicación de datos de películas con Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full text-white">
        <nav className="w-full px-20 py-4 fixed z-40 bg-primary-black/75 backdrop-blur-md">
          <div className="flex items-center justify-between">
            {/* Logo*/}
            <Link href="/" className="text-2xl font-bold text-white hover:text-movie-accent transition-colors">
              Next <span className="text-purple-active">Movies</span>
            </Link>

            {/* Navbar */}
            <div className="flex space-x-6">
              <Link
                href="/top-rated"
                className="nav-link text-white hover:text-purple-active transition-colors"
              >
                Mejor valoradas
              </Link>
              <Link
                href="/popular"
                className="nav-link text-white hover:text-purple-active transition-colors"
              >
                Populares
              </Link>
              <Link
                href="/now-playing"
                className="nav-link text-white hover:text-purple-active transition-colors"
              >
                En cartelera
              </Link>
            </div>

            <Link 
              href="/favorites"
              className="px-4 py-2 rounded-full border border-zinc-700 hover:border-purple-active text-white flex items-center transition-all"
            >
              <Heart size={18} className="mr-2 text-purple-active" />
              <span>Favoritos</span>
            </Link>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="py-6 mt-10">
          <div className="container mx-auto px-4 text-center text-gray-400 flex flex-row items-center justify-between">
            <p>&copy; {new Date().getFullYear()} Next Movies App</p>
            <p>Special Thanks to <a href="https://www.themoviedb.org/" target='_blank' className='underline'>TMDB</a></p>
            <p>By JulsCatalan</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
