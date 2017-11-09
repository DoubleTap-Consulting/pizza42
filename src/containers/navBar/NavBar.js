import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import logo from 'images/pizzaLogo.jpg';
import MenuIcon from 'material-ui-icons/Menu';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
// Relative imports
import Sidebar from './Sidebar';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }

  onLoginClick(history) {
    history.push('/login');
  }

  toggleSidebar = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
    });
  }

  openCart = (history) => {
    history.push('/cart');
  }

  navigateHome = (history) => {
    history.push('/home');
  }

  render() {
    return (
      [<div className="pizza42-navbar" key="navbar">
        <AppBar position="fixed">
          <Toolbar>
            <IconButton className="pizza42-navbar-iconButton" color="contrast" aria-label="Menu">
              <MenuIcon onClick={this.toggleSidebar} />
            </IconButton>
            <Typography type="title" color="inherit" className="pizza42-navbar-title">
              <img className="pizza42-navbar-logo" height={39} width={50} src={logo} />
              Pizza 42
            </Typography>
            {
              this.props.loggedIn ?
                <Route
                  render={({ history }) => (
                    <Button color="contrast" onClick={this.props.logout}>Logout</Button>
                  )}
                /> :
                <Route
                  render={({ history }) => (
                    <Button color="contrast" onClick={() => { this.onLoginClick(history); }}>Login</Button>
                  )}
                />
            }
          </Toolbar>
        </AppBar>
      </div>,
      <Route
        key="sidebar"
        render={({ history }) => (
          <Sidebar
            open={this.state.sidebarOpen}
            loggedIn={this.props.loggedIn}
            toggleSidebar={this.toggleSidebar}
            openCart={() => { this.openCart(history) }}
            navigateHome={() => { this.navigateHome(history) }}
          />
        )}
      />]
    );
  }
}

export default NavBar;
