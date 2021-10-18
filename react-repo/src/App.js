/* eslint-disable react-hooks/exhaustive-deps */
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './component/Header';
import SearchBox from './component/SearchBox';
import TabGroup from './component/tabs/TabGroup';
import Upcoming from './component/tabs/tabs/Upcoming';
import Popular from './component/tabs/tabs/Popular'
import TopRated from './component/tabs/tabs/TopRated'


function App() {
  return (
    <div className="grid">
      <BrowserRouter >
        <Header />

        <SearchBox />

        <TabGroup />

        <Switch>
          <div className="content">
            <Route exact path='/'>
            </Route>

            <Route exact path='/upcoming'>
              <Upcoming />
            </Route>

            <Route exact path='/popular'>
              <Popular />
            </Route>

            <Route exact path='/top-rated'>
              <TopRated />
            </Route>
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
