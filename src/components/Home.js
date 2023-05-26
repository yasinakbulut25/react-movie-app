import React from "react";
import MainHero from "./main-hero/MainHero";
import MoviesSlide from "./movies-slide/MoviesSlide";
import Intro from "./intro/Intro";

function Home() {
  return (
    <>
      <MainHero />
      <MoviesSlide type="movie" endpoint="top_rated" title="Top Rated" />
      <MoviesSlide type="movie" endpoint="popular" title="Popular" />
      <MoviesSlide type="movie" endpoint="upcoming" title="Upcoming" />
      <Intro type="movie" endpoint="top_rated" />
      <MoviesSlide type="tv" endpoint="popular" title="Popular" />
      <MoviesSlide type="tv" endpoint="top_rated" title="Top Rated" />
      <Intro type="tv" endpoint="popular" />
      <MoviesSlide type="tv" endpoint="airing_today" title="Airing Today" />
      <MoviesSlide type="tv" endpoint="on_the_air" title="On The Air" />
    </>
  );
}

export default Home;
