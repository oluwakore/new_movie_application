const api_Key: string = "f411bb4cc9d97db6a93107863e3daa99";
export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_Key}`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${api_Key}`;
export const upcomingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_Key}`;
export const movieSearch = (searchword: string): string => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${api_Key}&query=${searchword}`;
};

export const detailsOfMovie = (mov_id: number): string => {
  return `https://api.themoviedb.org/3/movie/${mov_id}?api_key=${api_Key}`;
};

export const detailsOfMovieCast = (mov_id: number): string => {
  return `https://api.themoviedb.org/3/movie/${mov_id}/credits?api_key=${api_Key}`;
};

export const pathToBaseImage = (size: string, path: string): string => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
