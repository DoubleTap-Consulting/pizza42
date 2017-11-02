import Home from './containers/home/Home';
import Login from './containers/login/Login';
import NavBar from 'containers/navBar/NavBar';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={() => <div>Default fallback test</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
