// Variable de entorno para el token
const API_TOKEN = process.env.TMDB_API_TOKEN;

export async function getNowPlayingMovies(page: number = 1) {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    next: { revalidate: 3600 },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error('Error al obtener películas en cartelera:', error);
    throw error;
  }
}

export async function getTopRatedMovies(page: number = 1) {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    next: { revalidate: 3600 },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error('Error al obtener películas mejor valoradas:', error);
    throw error;
  }
}

export async function getPopularMovies(page: number = 1) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    next: { revalidate: 3600 },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
    throw error;
  }
}

export async function getUpcomingMovies(page: number = 1) {
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=es-ES&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    next: { revalidate: 3600 },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error('Error al obtener próximos estrenos:', error);
    throw error;
  }
}