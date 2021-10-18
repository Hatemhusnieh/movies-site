/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import instance from '../../../API/axios';
import '../../../styles/movies-list.scss';

function Upcoming() {
  const [data, setData] = useState();

  useEffect(() => {
    async function api() {
      const params = {
        api_key: process.env.REACT_APP_MOVIE_DB_KEY,
      };
      const raw = await instance.get(`/movie/top_rated`, { params });
      const raw2 = await instance.get(`genre/movie/list`, { params });
      const moviesList = raw.data.results.map((data) => new Movie(data));
      moviesList.forEach((movie, idx) =>
        movie.genres.forEach((gen, ix) => (moviesList[idx].genres[ix] = _getGenre(gen, raw2.data.genres)))
      );
      setData(moviesList);

      function _getGenre(num, arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === num) return (num = arr[i].name);
        }
      }
    }
    api();
  }, []);

  return (
    <div className="upcoming">
      {data &&
        data.map((elm) => {
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

class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.poster = 'http://image.tmdb.org/t/p/w342' + data.poster_path;
    this.rating = data.vote_average;
    this.releaseDate = data.release_date;
    this.voteAvr = data.vote_average;
    this.genres = data.genre_ids;
  }
}

export default Upcoming;
