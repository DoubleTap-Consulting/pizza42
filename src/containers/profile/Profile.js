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
});

export class Profile extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: '',
        user_metadata: {
          socialProfiles: []
        }
      }
    };
    this.auth = new Auth();
    this.logos = {
      facebookLogo,
    };
  }

  componentWillMount() {
    this.auth.getProfile((err, profile) => {
      const config = {
        url: `/profile/${profile.sub}`,
        method: 'get'
      };
      callApi(config, (response) => {
        console.log(response);
        this.setState({
          profile: response.user
        }, () => {
          if (localStorage.getItem('loginType') === 'link') {
            const requestSub = localStorage.getItem('linkAccountRequestingSub');
            callApi({
              url: `/profile/link/${requestSub.substring(requestSub.indexOf('|') + 1)}`,
              method: 'post',
              data: {
                secondaryUserid: this.state.profile.user_id.substring(this.state.profile.user_id.indexOf('|') + 1),
                secondaryProvider: this.state.profile.user_id.substring(0, this.state.profile.user_id.indexOf('|'))
              }
            }, (response) => {
              console.log('finished linking accounts. response: ', response);
            }, (error) => {
              console.log(error);
            });
          }
        });
      }, (error) => {
        console.log(error);
      });
    });
  }

  linkAccount = (history) => {
    // Hack: using a HLP doesn't really allow us much info about why it was called
    // so set this so when we come back to Home container, we can know what kind of auth it was.
    // i.e. linking account vs new signup or login
    localStorage.setItem('loginType', 'link');
    localStorage.setItem('linkAccountRequestingSub', this.state.profile.user_id);
    history.push('/login');
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
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
          <Grid item xs={6}>
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
                <Typography type="body1">
                  Body text
                </Typography>
              </CardContent>
              <CardActions>
                <Route
                  render={({ history }) => (
                    <Button dense color="primary" onClick={() => this.linkAccount(history)}>
                      Link Account
                    </Button>
                  )}
                />
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
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
                <Typography type="body1">
                  Body text
                </Typography>
              </CardContent>
              <CardActions>
                <Button dense color="primary">
                  Link Account
              </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
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
                <Typography type="body1">
                  Body text
                </Typography>
              </CardContent>
              <CardActions>
                <Button dense color="primary">
                  Link Account
              </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
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
                <Typography type="body1">
                  Body text
                </Typography>
              </CardContent>
              <CardActions>
                <Button dense color="primary">
                  Link Account
              </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
