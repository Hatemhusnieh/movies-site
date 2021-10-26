/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import instance from '../API/axios';
import '../styles/movieProfile.scss';
import Carousel from 'react-bootstrap/Carousel';
import { BsPlayCircle } from 'react-icons/bs';

function MovieProfile(props) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieCast, setMovieCast] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  async function apiCall() {
    const params = {
      api_key: process.env.REACT_APP_MOVIE_DB_KEY,
    };

    const details = await instance.get(`/movie/${props.movieID}`, { params });
    const similar = await instance.get(`/movie/${props.movieID}/similar`, { params });
    const genresList = await instance.get(`genre/movie/list`, { params });
    const cast = await instance.get(`/movie/${props.movieID}/credits`, { params });

    similar.data.results.forEach((movie, idx) =>
      movie.genre_ids.forEach(
        (gen, id) => (similar.data.results[idx].genre_ids[id] = _getGenre(gen, genresList.data.genres))
      )
    );

    function _getGenre(num, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === num) return (num = arr[i].name);
      }
    }

    setMovieDetails(details.data);
    setSimilarMovies(similar.data.results);
    setMovieCast(cast.data);
  }

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  // useEffect(() => {
  //   if (movieCast) {
  //     setDirector(movieCast.crew.filter((per) => per.job === 'Director')[0].name);
  //     setActors(movieCast.cast.slice(0, 6));
  //     setShow(true);
  //   }
  // }, [movieCast]);

  console.log('details', movieDetails);
  // console.log('similar', similarMovies);
  // console.log(width);

  return (
    <div className="movie-page">
      {movieDetails && (
        <>
          <div className="profile-title">
            <h3>{movieDetails.original_title}</h3>
          </div>
          <div className="profile-grid">
            <div className="profile-data">
              <div className="movie-image">
                {width < 900 ? (
                  <img
                    src={`http://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`}
                    alt={movieDetails.original_title}
                  />
                ) : (
                  <img
                    src={`http://image.tmdb.org/t/p/w342/${movieDetails.backdrop_path}`}
                    alt={movieDetails.original_title}
                  />
                )}

                <h4>{movieDetails.original_title}</h4>
              </div>

              {movieCast && (
                <div className="movie-specs">
                  <div className="movie-details">
                    <div>Directed by: {movieCast.crew.filter((per) => per.job === 'Director')[0].name}</div>
                    <div>
                      Cast:{' '}
                      <span>
                        {movieCast.cast
                          .slice(0, 6)
                          .map((actor) => actor.name)
                          .join(', ')}
                      </span>
                    </div>
                    <div>
                      Genre: <span>{movieDetails.genres.map((genre) => genre.name).join(', ')}</span>
                    </div>
                    <div>Release Year: {movieDetails.release_date}</div>
                    <div>Running Time: {movieDetails.runtime} min</div>
                    <div>
                      Country:{' '}
                      <span>{movieDetails.production_countries.map((country) => country.name).join(', ')}</span>
                    </div>
                  </div>

                  <div className="movie-btn">
                    <div>
                      <BsPlayCircle />
                    </div>
                    <span>Watch Trailer</span>
                  </div>
                </div>
              )}
            </div>

            {similarMovies.length > 0 && (
              <div className="similar-movies">
                <h4>You may also like</h4>

                <div className="similar-movies-list">
                  {width >= 900 ? (
                    similarMovies.map((movie) => {
                      return (
                        <div className="movie-card" key={movie.original_title}>
                          <div className="img">
                            <img
                              src={'http://image.tmdb.org/t/p/w342' + movie.poster_path}
                              alt={movie.original_title}
                            />
                          </div>
                          <div
                            className="rating"
                            style={
                              movie.vote_average > 7
                                ? { borderColor: 'green' }
                                : movie.vote_average > 6.3
                                ? { borderColor: '#e7c019' }
                                : { borderColor: 'red' }
                            }
                          >
                            {movie.vote_average.toFixed(1)}
                          </div>
                          <div className="text">
                            <h3>{movie.original_title}</h3>
                            <span>{movie.genre_ids.join(', ')}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Carousel>
                      {similarMovies.map((movie) => {
                        return (
                          <Carousel.Item interval={3000}>
                            <div className="movie-card" key={movie.original_title}>
                              <div className="img">
                                <img
                                  src={'http://image.tmdb.org/t/p/w342' + movie.poster_path}
                                  alt={movie.original_title}
                                />
                              </div>
                              <div
                                className="rating"
                                style={
                                  movie.vote_average > 7
                                    ? { borderColor: 'green' }
                                    : movie.vote_average > 6.3
                                    ? { borderColor: '#e7c019' }
                                    : { borderColor: 'red' }
                                }
                              >
                                {movie.vote_average.toFixed(1)}
                              </div>
                              <div className="text">
                                <Carousel.Caption style={{ backgroundColor: '#ffffff00', bottom: '0rem' }}>
                                  <h3>{movie.original_title}</h3>
                                  <span>{movie.genre_ids.join(', ')}</span>
                                </Carousel.Caption>
                              </div>
                            </div>
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MovieProfile;
