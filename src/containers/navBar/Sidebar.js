import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import React, { Component } from 'react';
import './Sidebar.css';

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <Drawer className="pizza42-sidebar" open={this.props.open} onRequestClose={this.props.toggleSidebar}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.props.toggleSidebar}
          onKeyDown={this.props.toggleSidebar}
          style={{ width: 250 }}
        >
          <List>
            <ListItem button onClick={this.props.navigateHome}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={this.props.openCart}>
              <ListItemText primary="Cart" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
    );
  }
}

export default Sidebar;