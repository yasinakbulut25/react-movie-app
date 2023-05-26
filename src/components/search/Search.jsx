import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import "./search.scss";

function Search() {
  const { searchMovie } = useMovieContext();

  const types = [
    {
      title: "Movies",
      endpoint: "movie",
    },
    {
      title: "Series",
      endpoint: "tv",
    },
  ];

  const [query, setQuery] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [selectedType, setSelectedType] = useState(types[0]);

  const changeType = (type) => {
    setSelectedType(type);
    setQuery("");
    setMoviesData([]);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value) {
      const search = async () => {
        const data = await searchMovie(
          selectedType.endpoint,
          event.target.value
        );
        setMoviesData(data);
      };
      search();
    } else {
      setMoviesData([]);
    }
  };

  return (
    <div className="all-movies search-container">
      <div className="container">
        <div className="filter">
          <div className="filter-buttons">
            {types.map((type) => (
              <button
                className={
                  selectedType.endpoint === type.endpoint
                    ? "filter-btn active"
                    : "filter-btn"
                }
                key={type.endpoint}
                type="button"
                onClick={() => changeType(type)}
              >
                {type.title}
              </button>
            ))}
          </div>
        </div>
        <section className="section">
          <div className="section-title">
            <h2 className="title">
              <i className="bi bi-search"></i> Search {selectedType.title}
            </h2>
            <div className="line"></div>
          </div>
          <div className="search-box">
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={handleInputChange}
            />
          </div>

          {moviesData.length > 0 || query.length === 0 ? (
            <div className="movie-boxes">
              {moviesData.map((movie) =>
                movie.poster_path ? (
                  <div key={movie.id} className="movie-box">
                    <Link to={`/${selectedType.endpoint}/${movie.id}`}>
                      <img
                        className="movie-box-img"
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <div className="movie-infos">
                        <h2 className="movie-title">
                          {selectedType.endpoint === "movie"
                            ? movie.title
                            : movie.original_name}
                        </h2>
                        <div className="movie-vote">
                          <span className="imdb">IMDb</span>
                          <span className="vote">{movie.vote_average}</span>
                        </div>
                        <div className="movie-overview">
                          <p>{movie.overview}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <div className="not-found">{selectedType.title} not found!</div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Search;
