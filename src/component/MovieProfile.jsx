import React, { useEffect, useState } from 'react';
import instance from '../API/axios';
import { BsFillPlayBtnFill } from 'react-icons/bs';

function MovieProfile(props) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieCast, setMovieCast] = useState(null);

  async function apiCall() {
    const params = {
      api_key: process.env.REACT_APP_MOVIE_DB_KEY,
    };

    const details = await instance.get(`/movie/${props.movieID}`, { params });
    const similar = await instance.get(`/movie/${props.movieID}/similar`, { params });
    const cast = await instance.get(`/movie/${props.movieID}/credits`, { params });

    setMovieDetails(details.data);
    setSimilarMovies(similar.data.results);
    setMovieCast(cast.data);
  }

  useEffect(() => {
    apiCall();
  }, []);

  // useEffect(() => {
  //   if (movieCast) {
  //     setDirector(movieCast.crew.filter((per) => per.job === 'Director')[0].name);
  //     setActors(movieCast.cast.slice(0, 6));
  //     setShow(true);
  //   }
  // }, [movieCast]);

  console.log('details', movieDetails);
  console.log('similar', similarMovies);

  return (
    <div className="movie-page">
      {movieDetails && (
        <>
          <div className="profile-title">
            <h2>{movieDetails.original_title}</h2>
          </div>
          <div className="profile-grid">
            <div className="profile-data">
              <div className="movie-image">
                <img
                  src={`http://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`}
                  alt={movieDetails.original_title}
                />
              </div>

              <h4>{movieDetails.original_title}</h4>

              {movieCast && (
                <div className="movie-specs">
                  <div className="movie-details">
                    <div>Directed by: {movieCast.crew.filter((per) => per.job === 'Director')[0].name}</div>
                    <div>
                      Cast:{' '}
                      {movieCast.cast
                        .slice(0, 6)
                        .map((actor) => actor.name)
                        .join(', ')}
                    </div>
                    <div>Genre: {movieDetails.genres.map((genre) => genre.name).join(', ')}</div>
                    <div>Release Year: {movieDetails.release_date}</div>
                    <div>Running Time: {movieDetails.runtime} min</div>
                    <div>Country: {movieDetails.production_countries.map((country) => country.name).join(', ')}</div>
                  </div>

                  <div className="movie-btn">
                    <BsFillPlayBtnFill />
                    <span>Watch Trailer</span>
                  </div>
                </div>
              )}
            </div>

            {similarMovies.length > 0 && (
              <div className="similar-movies">
                <h4>You may also like ...</h4>
                <div className="similar-movies-list">
                  {similarMovies.map((movie) => {
                    return movie.original_title;
                  })}
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
