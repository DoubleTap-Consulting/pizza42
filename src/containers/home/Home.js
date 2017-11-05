import Grid from 'material-ui/Grid';
import PizzaCard from 'components/pizzaCard/PizzaCard';
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

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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