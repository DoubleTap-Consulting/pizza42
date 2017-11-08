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
      pizzas: seedPizzaArray()
    };
  }

  componentDidMount() {
    const auth = new Auth();
    auth.handleAuthentication()
      .then(user => {
        // Was logged in
        if (this.props.location.hash.indexOf('access_token') === -1) {
          console.log('not logged in');
        } else {
          this.setState({
            user
          }, () => {
            console.log('user', this.state.user);
            // See #19
            console.log('calling dat graph endpoint boiii');
            if (this.state.user.idTokenPayload.sub.indexOf('facebook') !== -1) {
              let config = {
                url: `/auth/searchGraphApi/${this.state.user.idTokenPayload.sub}`,
                method: 'get'
              };
              callApi(config, (response) => {
                let config = {
                  url: `/profile/${this.state.user.idTokenPayload.sub}`,
                  method: 'get'
                };
                callApi(config, response => this.setState({ user: response.user }), error => console.log(error));
              }, error => console.log(error));
            }
          });
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center" spacing={24}>
          {this.state.pizzas.map((pizza, index) => (
            <Grid item sm={6} lg={4} xl={2} >
              <PizzaCard
                addToCart={this.addToCart}
                image={pizza.image}
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