"use client";


export default function Footer() {
  return (
    <footer className="py-6 mt-10">
      <div className="container mx-auto px-4 text-center text-gray-400 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} Next Movies App</p>
        <p>Special Thanks to <a href="https://www.themoviedb.org/" target='_blank' className='underline'>TMDB</a></p>
        <p>By JulsCatalan</p>
      </div>
    </footer>
  );
}