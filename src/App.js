import React, { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './component/Header';
import SearchBox from './component/SearchBox';
import TabGroup from './component/tabs/TabGroup';
import Upcoming from './component/tabs/tabs/Upcoming';
import Popular from './component/tabs/tabs/Popular'
import TopRated from './component/tabs/tabs/TopRated'
import SearchResults from './component/SearchResults';


function App() {
  const [results, setResults] = useState({})

  return (
    <div className="grid">
      <BrowserRouter >
        <Header />

        <SearchBox setResults={setResults} />

        <TabGroup />

        <div className="content">
          <Switch>
            <Route exact path="/">
              welcome...!
            </Route>

            <Route exact path="/upcoming">
              <Upcoming />
            </Route>

            <Route exact path="/popular">
              <Popular />
            </Route>

            <Route exact path="/top-rated">
              <TopRated />
            </Route>

            <Route exact path="/search">
              <SearchResults data={results} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
