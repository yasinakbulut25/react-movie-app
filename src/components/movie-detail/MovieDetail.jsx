import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import ReactPlayer from "react-player";
import MoviesSlide from "../movies-slide/MoviesSlide";
import "./movie-detail.scss";
import Error from "../error/Error";

function MovieDetail({ type }) {
  const { findMovie, getMovieDetails, getMovieActors } = useMovieContext();
  const [movie, setMovie] = useState();
  const [videos, setVideos] = useState([]);
  const [actors, setActors] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await findMovie(type, id);
      setMovie(data);
      setLoading(false);
    };

    const fetchMovieTrailers = async () => {
      const data = await getMovieDetails(type, id, "videos");
      setVideos(data);
    };

    const fetchMovieActors = async () => {
      const data = await getMovieActors(type, id);
      setActors(data);
    };

    fetchMovies();
    fetchMovieTrailers();
    fetchMovieActors();
  }, [id, findMovie, getMovieDetails, getMovieActors, type]);

  const trailer = videos.find((video) => video.type === "Trailer");

  return (
    <div className="movie-detail-container">
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : movie && videos ? (
        <>
          <div
            className="main-img"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          />
          <div className="container">
            <div className="movie-detail">
              <div className="movie-grid main-hero">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="hero-infos">
                  <h2 className="hero-title">{movie.title}</h2>
                  <div className="hero-genres">
                    {movie.genres.map((genre) => (
                      <div key={genre.id} className="genre-box">
                        <i className="bi bi-record"></i>
                        {genre.name}
                      </div>
                    ))}
                  </div>
                  <div className="hero-vote">
                    <span className="imdb">IMDb</span>
                    <span className="vote">
                      {movie.vote_average.toFixed(1)} ({movie.vote_count})
                    </span>
                  </div>
                  <span className="date">
                    <i className="bi bi-calendar2-date"></i>
                    {type === "movie"
                      ? movie.release_date
                      : movie.first_air_date +
                        ` (${movie.number_of_seasons} season)`}
                  </span>
                  <div className="hero-overview">
                    <p>{movie.overview}</p>
                  </div>
                  {movie.tagline ? (
                    <i className="tagline">
                      <i className="bi bi-quote"></i> {movie.tagline}
                    </i>
                  ) : null}
                  <a className="hero-link" href="#trailer">
                    <i className="bi bi-collection-play"></i> Watch Now
                    <i className="bi bi-arrow-right arrow"></i>
                  </a>
                </div>
              </div>
            </div>

            {actors.length > 0 ? (
              <section className="section">
                <div className="section-title">
                  <h2 className="title">
                    <i className="bi bi-people"></i> Actors
                  </h2>
                  <div className="line"></div>
                </div>
                <div className="actors">
                  {actors.map((actor) =>
                    actor.profile_path ? (
                      <div key={actor.id} className="actor">
                        <img
                          className="actor-profile"
                          src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                          alt={actor.name}
                        />
                        <div className="actor-info">
                          <h3 className="actor-role">{actor.character}</h3>
                          <h4 className="actor-name">{actor.original_name}</h4>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </section>
            ) : null}

            {trailer ? (
              <section key={trailer.id} id="trailer" className="section">
                <div className="section-title">
                  <h2 className="title">
                    <i className="bi bi-play-btn"></i> Trailer
                  </h2>
                  <div className="line"></div>
                </div>
                <ReactPlayer
                  className="trailer"
                  url={`https://www.youtube.com/watch?v=${trailer.key}`}
                />
              </section>
            ) : null}
          </div>

          <MoviesSlide
            id={movie.id}
            type={type}
            endpoint={"recommendations"}
            title={"Recommendation"}
          />
          <MoviesSlide
            id={movie.id}
            type={type}
            endpoint={"similar"}
            title={"Similar"}
          />
        </>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default MovieDetail;
