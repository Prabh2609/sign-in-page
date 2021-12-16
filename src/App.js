import logo from './logo.svg';
import './App.css';
import {Login} from './Container/Login';
import {BrowserRouter ,Route, Router, Switch } from 'react-router-dom';
import Welcome from './Container/Welcome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/welcome' component={Welcome}/>
        </Switch>
      </BrowserRouter>
      {/* <Router>
        <Switch>
          <Route exact path='/welcome' component={Welcome} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
      <Login/>
      <Welcome/> */}
    </div>
  );
}

export default App;
