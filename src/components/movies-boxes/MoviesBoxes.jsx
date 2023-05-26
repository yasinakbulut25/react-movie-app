import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./movies-boxes.scss";

function MoviesBoxes({ type, endpoint, title }) {
  const { getMovies, getMovieDetails } = useMovieContext();
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies(type, endpoint);
      setMovieData(data);
      setLoading(false);
    };

    fetchMovies();
  }, [type, endpoint, getMovies, getMovieDetails]);

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : movieData.length > 0 ? (
        <section className="section">
          <div className="section-title">
            <h2 className="title">
              <i className="bi bi-collection-play"></i> {title}{" "}
              {type === "movie" ? "Movies" : "Series"}
            </h2>
            <div className="line"></div>
          </div>
          <div className="movie-boxes">
            {movieData.map((movie) =>
              movie.poster_path ? (
                <div key={movie.id} className="movie-box">
                  <Link to={`/${type}/${movie.id}`}>
                    <img
                      className="movie-box-img"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="movie-infos">
                      <h2 className="movie-title">{movie.title}</h2>
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
        </section>
      ) : null}
    </>
  );
}

export default MoviesBoxes;
