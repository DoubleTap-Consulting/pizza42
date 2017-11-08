import Auth from 'utils/auth';
import Cart from './containers/cart/Cart';
import Home from './containers/home/Home';
import Login from './containers/login/Login';
import NavBar from 'containers/navBar/NavBar';
import muiTheme from 'components/muiTheme';
import { MuiThemeProvider } from 'material-ui/styles';
import Profile from 'containers/profile/Profile';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    const auth = new Auth();
    // Was logged in
    if (!localStorage.getItem('access_token')) {
      this.setState({
        loggedIn: false
      })
    } else {
      this.setState({
        loggedIn: true
      })
    }
  }

  logout = () => {
    const auth = new Auth;
    this.setState({
      loggedIn: false
    })
    auth.logout()
  }

  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <div className="App">
          <NavBar loggedIn={this.state.loggedIn} logout={this.logout} />
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
