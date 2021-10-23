/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../styles/searchBox.scss';
import instance from '../API/axios';
import { BsSearch } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

function SearchBox(props) {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const history = useHistory();

  async function handleSearch() {
    await api();
    setQuery('');
  }
  useEffect(() => {
    props.setResults(data);
    if (data) history.push('/search');
  }, [data]);

  async function api() {
    const params = {
      api_key: process.env.REACT_APP_MOVIE_DB_KEY,
      query: query,
    };
    const raw = await instance.get(`/search/movie`, { params });
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

  return (
    <div className="search-box">
      <div className="search-container">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <span onClick={() => handleSearch()}>
          <BsSearch />
        </span>
      </div>
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

export default SearchBox;
