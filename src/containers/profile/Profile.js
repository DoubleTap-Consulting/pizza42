import Avatar from 'material-ui/Avatar';
import Auth from 'utils/auth';
import Button from 'material-ui/Button';
import callApi from 'utils/api';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import emailIcon from 'images/icon_email.png';
import googleLogo from 'images/logo_google.png';
import Grid from 'material-ui/Grid';
import facebookLogo from 'images/logo_facebook.jpg';
import PropTypes from 'prop-types';
import twitterLogo from 'images/logo_twitter.png';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  card: {
    // maxWidth: 400,
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#F44336',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  root: {
    marginTop: 100,
  },
});

export class Profile extends Component {
  static contextTypes = {
    history: PropTypes.object,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: '',
        sub: '',
        user_metadata: {
          socialProfiles: [],
        },
      },
    };
    this.auth = new Auth();
    this.logos = {
      facebookLogo,
    };
  }

  componentWillMount() {
    this.auth.getProfile((err, profile) => {
      if (!profile) {
        this.props.history.push('/login');
      }
      const config = {
        url: `/profile/${profile.sub}`,
        method: 'get',
      };
      callApi(config, (response) => {
        this.setState({
          profile: response.user,
        }, () => {
          this.state.profile.identities.forEach((identity) => {
            this.setState({
              [identity.connection]: identity.connection,
            });
          });
          if (localStorage.getItem('loginType') === 'link') {
            if (localStorage.getItem('linkingAfterRefresh') === 'true') {
              localStorage.setItem('linkingAfterRefresh', 'false');
              const requestSub = localStorage.getItem('linkAccountRequestingSub');
              callApi({
                url: `/profile/link/${requestSub}`,
                method: 'post',
                data: {
                  secondaryUserid: this.state.profile.user_id.substring(this.state.profile.user_id.indexOf('|') + 1),
                  secondaryProvider: this.state.profile.user_id.substring(0, this.state.profile.user_id.indexOf('|')),
                },
              }, () => {
                localStorage.setItem('loginType', '');
              }, () => { });
            } else {
              localStorage.setItem('linkingAfterRefresh', 'true');
              // refresh the view
              window.location.reload(false);
            }
          }
        });
      }, () => { });
    });
  }

  linkAccount = (history) => {
    // Hack: using a HLP doesn't really allow us much info about why it was called
    // so set this so when we come back to Home container, we can know what kind of auth it was.
    // i.e. linking account vs new signup or login
    localStorage.setItem('loginType', 'link');
    localStorage.setItem('linkAccountRequestingSub', this.state.profile.user_id);
    history.push('/login');
    // this.auth.login();
  }

  unlinkAccount = (platformName) => {
    let secondaryUserid;
    this.state.profile.identities.forEach((identity) => {
      if (identity.connection === platformName) {
        secondaryUserid = identity.user_id;
        // Set the existing social connection to null
        this.setState({
          [platformName]: null,
        });
      }
    });

    const config = {
      url: `/profile/link/${this.state.profile.user_id}`,
      method: 'delete',
      data: {
        secondaryProvider: platformName,
        secondaryUserid,
      },
    };

    callApi(config, () => {
      this.auth.getProfile((err, profile) => {
        if (!profile) {
          this.props.history.push('/login');
        }
        const config2 = {
          url: `/profile/${profile.sub}`,
          method: 'get',
        };
        callApi(config2, (response) => {
          this.setState({
            profile: response.user,
          }, () => {
            this.state.profile.identities.forEach((identity) => {
              this.setState({
                [identity.connection]: identity.connection,
              });
            });
          });
        }, () => { });
      });
    }, () => { });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {this.state.profile.name.substring(0, 1)}
              </Avatar>
            }
            title={this.state.profile.name}
            subheader="Member since November 5th, 2017"
            style={{ marginBottom: 15 }}
          />
        </Card>
        <Grid container justify="center" spacing={24}>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                image={facebookLogo}
                style={{ height: 200 }}
                title="Facebook logo"
              />
              <CardContent>
                <Typography type="headline">
                  Facebook
                </Typography>
              </CardContent>
              <CardActions>
                <Route
                  render={({ history }) => (
                    <Button dense color="primary" onClick={() => (this.state.facebook ? this.unlinkAccount('facebook') : this.linkAccount(history))}>
                      {this.state.facebook ? 'Unlink Account' : 'Link Account'}
                    </Button>
                  )}
                />
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                image={twitterLogo}
                style={{ height: 200 }}
                title="Twitter logo"
              />
              <CardContent>
                <Typography type="headline">
                  Twitter
                </Typography>
              </CardContent>
              <CardActions>
                <Route
                  render={({ history }) => (
                    <Button dense color="primary" onClick={() => this.linkAccount(history)}>
                      {this.state.twitter ? 'Unlink Account' : 'Link Account'}
                    </Button>
                  )}
                />
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                image={googleLogo}
                style={{ height: 200 }}
                title="Google logo"
              />
              <CardContent>
                <Typography type="headline">
                  Google
                </Typography>
              </CardContent>
              <CardActions>
                <Route
                  render={({ history }) => (
                    <Button dense color="primary" onClick={() => this.linkAccount(history)}>
                      {this.state['google-oauth2'] ? 'Unlink Account' : 'Link Account'}
                    </Button>
                  )}
                />
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                image={emailIcon}
                style={{ height: 200 }}
                title="Email logo"
              />
              <CardContent>
                <Typography type="headline">
                  Email
                </Typography>
              </CardContent>
              <CardActions>
                <Route
                  render={({ history }) => (
                    <Button dense color="primary" onClick={() => this.linkAccount(history)}>
                      {this.state['Username-Password-Authentication'] ? 'Unlink Account' : 'Link Account'}
                    </Button>
                  )}
                />
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
