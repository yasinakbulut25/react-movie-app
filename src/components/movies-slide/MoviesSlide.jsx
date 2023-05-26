import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Navigation } from "swiper";
import { useMovieContext } from "../../context/MovieContext";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./movies-slide.scss";

function MoviesSlide({ type, id, endpoint, title }) {
  const { getMovies, getMovieDetails } = useMovieContext();
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies(type, endpoint);
      setMovieData(data);
      setLoading(false);
    };

    const fetchMovieDetails = async () => {
      const data = await getMovieDetails(type, id, endpoint);
      setMovieData(data);
      setLoading(false);
    };

    id ? fetchMovieDetails() : fetchMovies();
  }, [type, endpoint, getMovies, id, getMovieDetails]);

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
              <i className="bi bi-collection-play"></i>{" "}
              {title + (type === "movie" ? " Movies" : " TV")}
            </h2>
            <div className="line"></div>
          </div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            slidesPerView={1.5}
            breakpoints={{
              400: {
                slidesPerView: 2,
                centeredSlides: false,
              },
              545: {
                slidesPerView: 2.5,
                centeredSlides: false,
              },
              645: {
                slidesPerView: 3,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 3.5,
                centeredSlides: false,
              },
              868: {
                slidesPerView: 4,
                centeredSlides: false,
              },
              1100: {
                slidesPerView: 5,
                centeredSlides: false,
              },
              1200: {
                slidesPerView: 6,
                centeredSlides: false,
              },
            }}
            freeMode={true}
            autoplay={{
              delay: 2500,
            }}
            navigation={true}
            modules={[FreeMode, Autoplay, Navigation]}
          >
            {movieData.map((movie) =>
              movie.poster_path ? (
                <SwiperSlide key={movie.id}>
                  <Link to={`/${type}/${movie.id}`}>
                    <img
                      className="movie-poster-img"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="movie-infos">
                      <h2 className="swiper-title">
                        {type === "movie" ? movie.title : movie.original_name}
                      </h2>
                      <div className="swiper-vote">
                        <span className="imdb">IMDb</span>
                        <span className="vote">{movie.vote_average}</span>
                      </div>
                      <div className="swiper-overview">
                        <p>{movie.overview}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        </section>
      ) : null}
    </>
  );
}

export default MoviesSlide;
