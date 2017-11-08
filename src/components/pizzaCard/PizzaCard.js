import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import React, { Component } from 'react';
import pizzaImage from 'images/peppPizza.jpg';
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
  static defaultProps = {
    isCartItem: false,
  }

  static propTypes = {
    addToCart: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
    isCartItem: PropTypes.bool,
    pizzaKey: PropTypes.number.isRequired,
    textBody: PropTypes.string.isRequired,
    textHeadline: PropTypes.string.isRequired,
  }

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
          <Button dense color="accent">
            Favorite
          </Button>
          <Button
            dense
            color="primary"
            onClick={() => this.props.addToCart({
              image: this.props.image,
              key: this.props.pizzaKey,
              textBody: this.props.textBody,
              textHeadline: this.props.textHeadline,
            })}
          >
            {this.props.isCartItem ? 'Remove from Cart' : 'Add to Order'}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(muiComponentStyles)(PizzaCard);
