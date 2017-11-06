import Avatar from 'material-ui/Avatar';
import Auth from 'utils/auth';
import callApi from 'utils/api';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
        name: ''
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
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {this.state.profile.name.substring(0, 1)}
            </Avatar>
          }
          title={this.state.profile.name}
          subheader="Member since November 5th, 2017"
        />
      </Card>
    );
  }
}

export default withStyles(styles)(Profile);
