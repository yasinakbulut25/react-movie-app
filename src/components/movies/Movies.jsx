import React, { useState } from "react";
import MoviesBoxes from "../movies-boxes/MoviesBoxes";
import "./movies.scss";

function Movies({ type }) {
  const types = {
    movie: [
      {
        title: "Popular",
        endpoint: "popular",
      },
      {
        title: "Top Rated",
        endpoint: "top_rated",
      },
      {
        title: "Upcoming",
        endpoint: "upcoming",
      },
    ],
    tv: [
      {
        title: "Popular",
        endpoint: "popular",
      },
      {
        title: "Top Rated",
        endpoint: "top_rated",
      },
      {
        title: "Airing Today",
        endpoint: "airing_today",
      },
      {
        title: "On The Air",
        endpoint: "on_the_air",
      },
    ],
  };

  const [selectedType, setSelectedType] = useState(types[type][0]);

  const changeType = (objType) => setSelectedType(objType);

  return (
    <div className="all-movies">
      <div className="container">
        <div className="filter">
          <div className="filter-buttons">
            {types[type].map((type) => (
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
        <MoviesBoxes
          type={type}
          title={selectedType.title}
          endpoint={selectedType.endpoint}
        />
      </div>
    </div>
  );
}

export default Movies;
