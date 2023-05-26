import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import "./intro.scss";

function Intro({ type, endpoint }) {
  const { getMovies } = useMovieContext();
  const [serious, setSerious] = useState([]);
  const [randomIndex, setRandomIndex] = useState([]);

  const createRandomIndex = () =>
    setRandomIndex(Math.floor(Math.random() * 20));

  useEffect(() => {
    const fetchSerious = async () => {
      const data = await getMovies(type, endpoint);
      setSerious(data);
    };

    fetchSerious();
    createRandomIndex();
  }, [endpoint, getMovies, type]);

  return (
    <div className="intro-area">
      <div className="container">
        {serious.length > 0 && serious[randomIndex].backdrop_path ? (
          <>
            <img
              className="hero-img"
              src={`https://image.tmdb.org/t/p/original${serious[randomIndex].backdrop_path}`}
              alt={serious[randomIndex].overview}
            />
            <div className="tv-hero">
              <div className="main-hero">
                <div className="hero-infos">
                  <h2 className="hero-title">
                    {type === "movie"
                      ? serious[randomIndex].title
                      : serious[randomIndex].original_name}
                  </h2>
                  <div className="hero-overview">
                    <p>{serious[randomIndex].overview}</p>
                  </div>
                  <Link
                    className="hero-link"
                    to={`${type}/${serious[randomIndex].id}`}
                  >
                    <i className="bi bi-collection-play"></i> Watch Now
                    <i className="bi bi-arrow-right arrow"></i>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Intro;
