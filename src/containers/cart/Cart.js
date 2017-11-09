import Grid from 'material-ui/Grid';
import PizzaCard from 'components/pizzaCard/PizzaCard';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import './Cart.css';

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
      cartEmpty: false,
      loggedIn: true,
    };
  }

  componentWillMount() {
    const cart = JSON.parse(localStorage.getItem('cart')); // eslint-disable-line no-undef
    if (cart) {
      this.setState({
        cart,
        cartEmpty: false,
      });
    } else {
      this.setState({
        cartEmpty: true,
      });
    }
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
                loggedIn={this.state.loggedIn}
                pizzaKey={pizza.key}
                textBody={pizza.textBody}
                textHeadline={pizza.textHeadline}
                user={this.state.user}
              />
            </Grid>
          ))}
        </Grid>
        {
          (this.state.cartEmpty || this.state.cart.length === 0) &&
          <img src="http://www.startergroup.in/img/empty.png" className="cartEmpty" alt="cart empty" />
        }
      </div>
    );
  }
}

export default withStyles(styles)(Cart);
