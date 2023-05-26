import React from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import "./main-hero.scss";

function MainHero() {
  const { movies, genres } = useMovieContext();
  const randomIndex = Math.floor(Math.random() * 20);

  return (
    <div className="main-hero-container">
      {movies.length > 0 && genres.length > 0 ? (
        <div className="main-hero">
          <img
            className="hero-img"
            src={`https://image.tmdb.org/t/p/original${movies[randomIndex].backdrop_path}`}
            alt={movies[randomIndex].title}
          />
          <div className="container">
            <div className="hero-infos center">
              <h2 className="hero-title">{movies[randomIndex].title}</h2>
              <div className="hero-genres">
                {movies[randomIndex].genre_ids.map((id) => (
                  <div key={id} className="genre-box">
                    <i className="bi bi-record"></i>
                    {genres.find((genre) => genre.id === id).name}
                  </div>
                ))}
              </div>
              <div className="hero-vote">
                <span className="imdb">IMDb</span>
                <span className="vote">{movies[randomIndex].vote_average}</span>
              </div>
              <div className="hero-overview">
                <p>{movies[randomIndex].overview}</p>
              </div>
              <Link
                className="hero-link"
                to={`movie/${movies[randomIndex].id}`}
              >
                <i className="bi bi-collection-play"></i> Watch Now
                <i className="bi bi-arrow-right arrow"></i>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MainHero;
