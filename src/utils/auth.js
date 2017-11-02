import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'doubletap-consulting.auth0.com',
    clientID: 'rTPIMjZe2grcF0R1Wivk3reWoQoQakO9',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://doubletap-consulting.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  })

  login() {
    this.auth0.authorize();
  }
}