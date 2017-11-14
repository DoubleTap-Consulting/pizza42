import Auth from 'utils/auth';
import callApi from 'utils/api';
import Grid from 'material-ui/Grid';
import PizzaCard from 'components/pizzaCard/PizzaCard';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
// Relative imports
import seedPizzaArray from './pizzasArray';

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

class Home extends Component {
  static contextTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    forceRender: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      pizzas: seedPizzaArray(),
      user: {
        idTokenPayload: {
          sub: '',
        },
        user_metadata: {
          favorite_pizzas: [],
        },
      },
      loggedIn: false,
    };
  }

  componentDidMount() {
    const auth = new Auth();
    let uid = localStorage.getItem('userid');
    if (uid) {
      const config = {
        url: `/profile/${uid}`,
        method: 'get',
      };
      callApi(config, (response) => {
        this.setState({ user: response.user, loggedIn: true });
      }, error => console.log(error));
    }

    auth.handleAuthentication()
      .then((user) => {
        // Error out here, says 'nonce does not match'
        if (!this.props.location.hash.indexOf('access_token')) {
          // Not logged in
          this.setState({
            loggedIn: false,
          });
        } else {
          this.props.forceRender();
          uid = user.idTokenPayload.sub;
          const userConfig = {
            url: `/profile/${uid}`,
            method: 'get',
          };
          callApi(userConfig, (response) => {
            this.setState({ user: response.user, loggedIn: true });
          }, error => console.log(error));
          if (user.idTokenPayload.sub.indexOf('facebook') !== -1) {
            const config = {
              url: `/auth/searchGraphApi/${user.idTokenPayload.sub}`,
              method: 'get',
            };
            callApi(config, () => { }, error => console.log(error));
          }
        }
      });

    if (localStorage.getItem('loginType') === 'link') {
      this.props.history.push('/profile');
    }
  }

  addToCart = (pizza) => {
    let cart = [];
    const existingCart = JSON.parse(localStorage.getItem('cart'));

    if (existingCart) {
      cart = [...existingCart];
    }

    cart.push(pizza);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  checkAccessToken = (nextState) => {
    const auth = new Auth();
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="flex-start" spacing={24}>
          {this.state.pizzas.map(pizza => (
            <Grid item key={pizza.textHeadline} sm={6} md={6} lg={4} xl={2}>
              <PizzaCard
                addToCart={this.addToCart}
                user_metadata={this.state.user.user_metadata}
                image={pizza.image}
                loggedIn={this.state.loggedIn}
                pizzaId={pizza.key}
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

export default withStyles(styles)(Home);
