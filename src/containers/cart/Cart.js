import Grid from 'material-ui/Grid';
import PizzaCard from 'components/pizzaCard/PizzaCard';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Cart extends Component {
  static contextTypes = {
    location: PropTypes.object,
  }

  static defaultProps = {
    classes: {},
  }

  static propTypes = {
    classes: PropTypes.object,
    location: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart')); // eslint-disable-line no-undef

    this.setState({
      cart,
    });
  }

  removeCartItem = (key) => {
    const cart = this.state.cart.slice();

    cart.splice(key, 1);

    this.setState({
      cart,
    }, () => {
      localStorage.setItem('cart', JSON.stringify(cart)); // eslint-disable-line no-undef
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="flex-start" spacing={24}>
          {this.state.cart.map((pizza, index) => (
            <Grid item key={`${pizza.textHeadline}${index}`} sm={6} md={6} lg={4} xl={2}>
              <PizzaCard
                addToCart={() => { this.removeCartItem(index); }}
                image={pizza.image}
                isCartItem
                pizzaKey={pizza.key}
                textBody={pizza.textBody}
                textHeadline={pizza.textHeadline}
                user={this.state.user}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Cart);
