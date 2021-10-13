import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './component/Header';


function App() {
  return (
    <div className="grid">
      <BrowserRouter >
        <Header />
        <Switch>
          <Route exact path='/'>

          </Route>

          <Route exact path='/'>

          </Route>

          <Route exact path='/'>

          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
