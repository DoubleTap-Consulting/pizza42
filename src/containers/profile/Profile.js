import Avatar from 'material-ui/Avatar';
import Auth from 'utils/auth';
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
    this.state = {};
    this.auth = new Auth();
  }

  componentWillMount() {
    this.setState({ profile: {} });
    this.auth.getProfile((err, profile) => {
      this.setState({ profile }, () => {
        console.log('profile state:', this.state);
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { profile } = this.state;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              M
          </Avatar>
          }
          title="mike@michaelflores.io"
          subheader="Member since November 5th, 2017"
        />
      </Card>
    );
  }
}

export default withStyles(styles)(Profile);
