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
    paddingRight: 30
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
    location: PropTypes.object
  }

  static defaultProps = {
    history: {},
    location: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      pizzas: seedPizzaArray(),
      user: {
        idTokenPayload: {
          sub: ''
        },
        user_metadata: {
          favorite_pizzas: []
        }
      }
    };
  }

  componentDidMount() {
    const auth = new Auth();
    const uid = localStorage.getItem('userid')
    if (uid) {
      this.setState({
        loggedIn: true
      })
      let config = {
        url: `/profile/${uid}`,
        method: 'get'
      };
      callApi(config, response => {
        console.log('response', response.user);
        this.setState({ user: response.user })
      }, error => console.log(error));
    }

    auth.handleAuthentication()
      .then(user => {
        // Was logged in
        if (!this.props.location.hash.indexOf('access_token')) {
          console.log('not logged in');
          this.setState({
            loggedIn: false
          })
        } else {
          console.log('url', `/profile/${user.idTokenPayload.sub}`)
          this.setState({
            loggedIn: true
          })
          if (user.idTokenPayload.sub.indexOf('facebook') !== -1) {
            let config = {
              url: `/auth/searchGraphApi/${user.idTokenPayload.sub}`,
              method: 'get'
            };
            callApi(config, (response) => { }, error => console.log(error));
          }
        }
      });

    if (localStorage.getItem('loginType') === 'link') {
      this.props.history.push('/profile');
    }
  }

  addToCart = () => {
    // check if loggedIn
    // add to localStorage
    const currentCount = localStorage.getItem('cartCount') || 0;
    localStorage.setItem('cartCount', parseInt(currentCount, 10) + 1);
  }

  checkAccessToken = (nextState, replace) => {
    const auth = new Auth();
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  }

  logging = () => {
    console.log('state', this.state)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center" spacing={24}>
          {this.state.pizzas.map((pizza, index) => (
            <Grid item sm={6} lg={4} xl={2} >
              <PizzaCard
                addToCart={this.addToCart}
                user_metadata={this.state.user.user_metadata}
                image={pizza.image}
                loggedIn={this.state.loggedIn}
                pizzaId={pizza.key}
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