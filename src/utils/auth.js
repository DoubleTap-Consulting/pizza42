import auth0 from 'auth0-js';
import history from 'utils/history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'doubletap-consulting.auth0.com',
    clientID: 'rTPIMjZe2grcF0R1Wivk3reWoQoQakO9',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://doubletap-consulting.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  })

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
        console.log('authResult', authResult);
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }
}