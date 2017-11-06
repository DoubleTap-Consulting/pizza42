import Cart from './containers/cart/Cart';
import Home from './containers/home/Home';
import Login from './containers/login/Login';
import NavBar from 'containers/navBar/NavBar';
import muiTheme from 'components/muiTheme';
import { MuiThemeProvider } from 'material-ui/styles';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
