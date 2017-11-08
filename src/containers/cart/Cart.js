import Grid from 'material-ui/Grid';
import CartItem from 'components/cartItem/CartItem';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 100,
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
    this.state = {
      cartCount: 0,
      cart: []
    };
  }

  componentDidMount() {
    console.log('here')
    const cartCount = localStorage.getItem('cartCount') || 0;
    let cart = [];
    for (var i = 0; i < cartCount; i++) {
      cart.push(1);
    }
    this.setState({
      cart,
      cartCount
    })
  }

  removeCartItem = () => {
    localStorage.setItem('cartCount', this.state.cartCount - 1 || 0);
    this.setState({
      cart: this.state.cart.splice(1),
      cartCount: this.state.cartCount - 1
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="left" spacing={24}>
          {
            this.state.cart.map((i) =>
              <Grid item key={this.state.cartCount[i]}>
                <CartItem removeCartItem={this.removeCartItem} />
              </Grid>
            )
          }
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Cart);