import auth0 from 'auth0-js';
import history from 'utils/history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'doubletap-consulting.auth0.com',
    clientID: 'rTPIMjZe2grcF0R1Wivk3reWoQoQakO9',
    redirectUri: 'http://ec2-54-183-30-7.us-west-1.compute.amazonaws.com/callback',
    audience: 'https://doubletap-consulting.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile',
  })

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile = (cb) => {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  /**
   * @returns {object} The authentication information.
   */
  handleAuthentication() {
    const handleAuth = new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          history.replace('/home');
          resolve(authResult);
        } else if (err) {
          history.replace('/home');
          reject(err);
        }
      });
    });
    return handleAuth;
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('userid', authResult.idTokenPayload.sub);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    // history.replace('/home');
  }

  login() {
    this.auth0.authorize();
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('cartCount');
    localStorage.removeItem('userid');
    // navigate to the home route
    history.replace('/home');
  }
}
