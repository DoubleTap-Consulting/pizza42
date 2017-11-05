import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import logo from 'pizzaLogo.jpg';
import MenuIcon from 'material-ui-icons/Menu';
import React, { Component } from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './NavBar.css';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              <img height={25} width={25} src={logo} />
              Title
          </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;