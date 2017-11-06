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
    paddingLeft: 30,
    paddingRight: 30
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Cart extends Component {
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

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="left" spacing={24}>
          <Grid item>
            <PizzaCard />
          </Grid>
          <Grid item>
            <PizzaCard />
          </Grid>
          <Grid item>
            <PizzaCard />
          </Grid>
          <Grid item>
            <PizzaCard />
          </Grid>
          <Grid item>
            <PizzaCard />
          </Grid>
          <Grid item>
            <PizzaCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Cart);