/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchResults(props) {
  const [id, setID] = useState(null);
  const history = useHistory();

  useEffect(() => {
    props.setMovieID(id);
    if (id) history.push(`/profile/${id}`);
  }, [id]);

  useEffect(() => {
    props.setSelected('');
  });

  return (
    <div className="upcoming">
      {props.data &&
        props.data.map((elm) => {
          console.log(elm.id);
          return (
            <div className="movie-card" key={elm.title}>
              <div className="img" onClick={() => setID(elm.id)}>
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
