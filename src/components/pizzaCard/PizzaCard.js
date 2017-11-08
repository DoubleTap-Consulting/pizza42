import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { favoritePizza, unfavoritePizza } from 'utils/home';
import React, { Component } from 'react';
import pizzaImage from 'images/peppPizza.jpg';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';

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
    this.state = {
      favorited: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user_metadata) {
      if (_.indexOf(nextProps.user_metadata.favorite_pizzas, nextProps.pizzaId) !== -1) {
        this.setState({
          favorited: true
        });
      };
    }
  }

  favorite = () => {
    favoritePizza(this.props.pizzaId, this.props.user.user_id)
    this.setState({
      favorited: true
    })
  }

  unfavorite = () => {
    unfavoritePizza(this.props.pizzaId, this.props.user.user_id)
    this.setState({
      favorited: false
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={this.props.image || pizzaImage}
          title="Pizza image"
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {this.props.textHeadline}
          </Typography>
          <Typography component="p">
            {this.props.textBody}
          </Typography>
        </CardContent>
        <CardActions>
          {
            this.state.favorited && this.props.loggedIn ?
              <Button dense color="accent" onClick={this.unfavorite}>
                Unfavorite
            </Button> :
              <Button dense disabled={!this.props.loggedIn} color="accent" onClick={this.favorite}>
                Favorite
            </Button>
          }
          <Button dense color="primary" disabled={!this.props.loggedIn} onClick={this.props.addToCart}>
            Add to Order
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(muiComponentStyles)(PizzaCard);