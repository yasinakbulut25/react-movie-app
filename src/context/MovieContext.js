import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MovieContext = createContext();

function Provider({ children }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const API_KEY = "{YOUR_API_KEY}";
  const API_URL = "https://api.themoviedb.org/3/";

  const getMovies = async (type, endpoint) => {
    const response = await axios.get(
      `${API_URL}${type}/${endpoint}?api_key=${API_KEY}`
    );
    return response.data.results;
  };

  const findMovie = async (type, movieId) => {
    const response = await axios.get(
      `${API_URL}${type}/${movieId}?api_key=${API_KEY}`
    );
    return response.data;
  };

  const getMovieDetails = async (type, movieId, endpoint) => {
    const response = await axios.get(
      `${API_URL}${type}/${movieId}/${endpoint}?api_key=${API_KEY}`
    );
    return response.data.results;
  };

  const getMovieActors = async (type, movieId) => {
    const response = await axios.get(
      `${API_URL}${type}/${movieId}/credits?api_key=${API_KEY}`
    );
    return response.data.cast;
  };

  const searchMovie = async (type, query) => {
    const response = await axios.get(
      `${API_URL}search/${type}?api_key=${API_KEY}&language=en-US&query=${query}`
    );
    return response.data.results;
  };

  const getGenres = async () => {
    const response = await axios.get(
      `${API_URL}genre/movie/list?api_key=${API_KEY}`
    );
    setGenres(response.data.genres);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies("movie", "popular");
      setMovies(data);
    };

    fetchMovies();
    getGenres();
  }, []);

  const sharedValuesAndMethods = {
    movies,
    genres,
    getMovies,
    findMovie,
    getMovieDetails,
    getMovieActors,
    searchMovie,
  };

  return (
    <MovieContext.Provider value={sharedValuesAndMethods}>
      {children}
    </MovieContext.Provider>
  );
}

const useMovieContext = () => useContext(MovieContext);
export { Provider, useMovieContext };
export default MovieContext;
