# Next-Movies App

Una aplicación web moderna para explorar películas utilizando la API de TMDB (The Movie Database).

## 📋 Características

- **Catálogo de películas**: Explora las películas populares, mejor valoradas y en cartelera
- **Detalles de películas**: Visualiza información detallada de cada película
- **Gestión de favoritos**: Guarda tus películas favoritas en el navegador usando localStorage
- **Diseño responsivo**: Experiencia de usuario optimizada para todos los dispositivos
- **Tema oscuro/claro**: Interfaz adaptable a las preferencias del usuario

## 🚀 Tecnologías

Este proyecto está construido con tecnologías modernas:

- [Next.js](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático para JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [ESLint](https://eslint.org/) - Linter para JavaScript/TypeScript
- [TMDB API](https://www.themoviedb.org/documentation/api) - API para datos de películas

## ⚙️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/next-movies.git
   cd next-movies
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto con tu clave API de TMDB:
   ```
    TMDB_API_TOKEN=tu_clave_api_aquí
   ```

   > Puedes obtener una clave API gratuita registrándote en [TMDB](https://www.themoviedb.org/signup)

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.


## 🔧 Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia la aplicación construida
- `npm run lint` - Ejecuta el linter

## 🌐 API

La aplicación utiliza la API de TMDB para obtener información sobre películas. Las principales endpoints utilizados son:

- `/movie/popular` - Películas populares
- `/movie/top_rated` - Películas mejor valoradas
- `/movie/now_playing` - Películas en cartelera

## 📱 Funcionalidades

### Exploración de películas
Navega por categorías como populares, mejor valoradas y en cartelera.

### Detalles de películas
Accede a información detallada de cada película, incluyendo sinopsis, valoración, género y más.

### Gestión de favoritos
Añade películas a tus favoritos para acceder a ellas rápidamente más tarde. Esta función utiliza localStorage para guardar tus preferencias en el navegador.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes, abre primero un issue para discutir lo que te gustaría cambiar.

## 📄 Licencia

[MIT](https://choosealicense.com/licenses/mit/)

---

Desarrollado con ❤️ usando Next.js y la API de TMDB
