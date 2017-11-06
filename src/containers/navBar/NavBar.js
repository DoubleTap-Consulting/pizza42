import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import logo from 'pizzaLogo.jpg';
import MenuIcon from 'material-ui-icons/Menu';
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLoginClick(history) {
    history.push('/login');
  }

  render() {
    return (
      <div className="pizza42-navbar">
        <AppBar position="static">
          <Toolbar>
            <IconButton className="pizza42-navbar-iconButton" color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className="pizza42-navbar-title">
              <img className="pizza42-navbar-logo" height={39} width={50} src={logo} />
              Pizza 42
          </Typography>
            <Route
              render={({ history }) => (
                <Button color="contrast" onClick={() => { this.onLoginClick(history) }}>Login</Button>
              )}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;