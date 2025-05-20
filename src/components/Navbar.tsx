"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Variantes de animación para el menú móvil
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.05,
        when: "beforeChildren"
      }
    }
  };

  // Variantes para los elementos del menú
  const itemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <nav className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-4 fixed z-40 bg-primary-black/75 backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold text-white hover:text-movie-accent transition-colors">
          Next <span className="text-purple-active">Movies</span>
        </Link>

        {/* Hamburger Menu Button (Mobile) con animación de icono */}
        <button 
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isMenuOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 lg:space-x-6">
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

        {/* Favoritos Button (Desktop) */}
        <Link 
          href="/favorites"
          className="hidden md:flex px-4 py-2 rounded-full border border-zinc-700 hover:border-purple-active text-white items-center transition-all"
        >
          <Heart size={18} className="mr-2 text-purple-active" />
          <span>Favoritos</span>
        </Link>
      </div>

      {/* Mobile Navigation Menu con animación */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden flex flex-col space-y-4 border-t border-zinc-800 pt-4 mt-4 pb-2"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/top-rated"
                className="nav-link text-white hover:text-purple-active transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Mejor valoradas
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link
                href="/popular"
                className="nav-link text-white hover:text-purple-active transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Populares
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link
                href="/now-playing"
                className="nav-link text-white hover:text-purple-active transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                En cartelera
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link 
                href="/favorites"
                className="flex px-4 py-2 w-full sm:w-auto rounded-full border border-zinc-700 hover:border-purple-active text-white items-center transition-all justify-center sm:justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={18} className="mr-2 text-purple-active" />
                <span>Favoritos</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}