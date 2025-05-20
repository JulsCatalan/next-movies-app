import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Next Movies App',
  description: 'Aplicación de datos de películas con Next.js',
  icons: {
    icon: '/movie.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full text-white">
        <Navbar />
      
        <main className="pt-16">{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}