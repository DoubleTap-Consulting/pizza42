import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import React, { Component } from 'react';
import pizzaImage from 'peppPizza.jpg';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const muiComponentStyles = {
  card: {
    width: 345,
  },
  media: {
    height: 200,
  },
};

export class PizzaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={pizzaImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography type="headline" component="h2">
            Medium Pepperoni Pizza
          </Typography>
          <Typography component="p">
            A delicious, delectable, delightful pizza topped with pepperonis.
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense color="accent">
            Favorite
          </Button>
          <Button dense color="primary" onClick={this.props.addToCart}>
            Add to Order
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(muiComponentStyles)(PizzaCard);