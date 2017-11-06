import Auth from 'utils/auth';
import Grid from 'material-ui/Grid';
import PizzaCard from 'components/pizzaCard/PizzaCard';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Home extends Component {
  static contextTypes = {
    location: PropTypes.object
  }

  static defaultProps = {
    location: {}
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const auth = new Auth();
    console.log('props', this.props);
    // Was logged in
    if (this.props.location.hash.indexOf('access_token') === -1) {
      console.log('not logged in');
    } else {
      auth.handleAuthentication();
    }
  }

  checkAccessToken = (nextState, replace) => {
    const auth = new Auth();
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <PizzaCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PizzaCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PizzaCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PizzaCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PizzaCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PizzaCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);