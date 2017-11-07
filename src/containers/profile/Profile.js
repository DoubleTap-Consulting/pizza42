import Avatar from 'material-ui/Avatar';
import Auth from 'utils/auth';
import callApi from 'utils/api';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
        });
      }, (error) => {
        console.log(error);
      });
    });
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
          {this.state.profile.user_metadata.socialProfiles.map((account, index) => (
            <Grid key={account.typeName} item xs={6}>
              <Card>
                <CardContent>
                  <Typography type="headline">
                    {account.typeName}
                  </Typography>
                  <Typography type="body1">
                    {account.url}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
