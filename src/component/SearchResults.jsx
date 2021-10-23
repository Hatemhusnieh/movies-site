import React from 'react';

function SearchResults(props) {
  return (
    <div className="upcoming">
      {props.data &&
        props.data.map((elm) => {
          return (
            <div className="movie-card" key={elm.title}>
              <div className="img">
                <img src={elm.poster} alt={elm.title} />
              </div>
              <div className="rating">{elm.rating}</div>
              <div className="text">
                <h3>{elm.title}</h3>
                <span>{elm.genres.join(', ')}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default SearchResults;
