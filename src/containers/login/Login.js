import Auth from 'utils/auth';
import React, { Component } from 'react';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const auth = new Auth();
    auth.login();
  }

  render() {
    return null;
  }
}

export default Login;