'use strict';
const superagent = require('superagent');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY;

router.get('/', getUpcoming);

async function getUpcoming(req, res) {
  const url = `https://api.themoviedb.org/3/movie/upcoming`;

  const genreParams = {
    api_key: MOVIE_DB_KEY,
    language: 'en-US',
  };
  const raw = await superagent.get('https://api.themoviedb.org/3/genre/movie/list').query(genreParams);
  const genres = raw.body.genres;

  const params = {
    api_key: MOVIE_DB_KEY,
    language: 'en-US',
    page: 1,
  };

  superagent.get(url).query(params)
    .then(movieRes => {
      const moviesList = movieRes.body.results.map(data => new Movie(data));
      moviesList.forEach((movie, idx) => movie.genres.forEach((gen, ix) => moviesList[idx].genres[ix] = _getGenre(gen, genres)));
      res.status(200).send(moviesList);
    }).catch(error => { console.error(error); });
}

function _getGenre(num, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === num) return num = arr[i].name;
  }
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

module.exports = router;