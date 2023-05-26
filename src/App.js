import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/Home";
import MovieDetail from "./components/movie-detail/MovieDetail";
import Movies from "./components/movies/Movies";
import Error from "./components/error/Error";
import Search from "./components/search/Search";
import "./App.scss";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies type="movie" />} />
        <Route path="/movie/:id" element={<MovieDetail type="movie" />} />
        <Route path="/tv" element={<Movies type="tv" />} />
        <Route path="/tv/:id" element={<MovieDetail type="tv" />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
