import React, { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './component/Header';
import SearchBox from './component/Search/SearchBox';
import TabGroup from './component/tabs/TabGroup';
import Upcoming from './component/tabs/tabs/Upcoming';
import Popular from './component/tabs/tabs/Popular'
import TopRated from './component/tabs/tabs/TopRated'
import SearchResults from './component/Search/SearchResults';
import MovieProfile from './component/MovieProfile';
import Home from './component/Home';


function App() {
  const [results, setResults] = useState({})
  const [movieID, setMovieID] = useState(null)
  const [selected, setSelected] = useState('');

  return (
    <div className="grid">
      <BrowserRouter >
        <Header />

        <SearchBox setResults={setResults} />

        <TabGroup selected={selected} setSelected={setSelected} />

        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home setSelected={setSelected} />
            </Route>

            <Route exact path="/upcoming">
              <Upcoming setMovieID={setMovieID} />
            </Route>

            <Route exact path="/popular">
              <Popular setMovieID={setMovieID} />
            </Route>

            <Route exact path="/top-rated">
              <TopRated setMovieID={setMovieID} />
            </Route>

            <Route exact path="/search">
              <SearchResults data={results} setMovieID={setMovieID} setSelected={setSelected} />
            </Route>

            <Route exact path={`/profile/${movieID}`}>
              <MovieProfile movieID={movieID} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
