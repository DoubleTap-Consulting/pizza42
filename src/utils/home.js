import callApi from 'utils/api';

export function favoritePizza(pizzaId, userId) {
  console.log('userId', userId)
  let config = {
    url: `/profile/favorites/${userId}`,
    method: 'post',
    data: {
      pizzaId
    }
  };
  callApi(config, (response) => {

  }, error => console.log(error));
}

export function unfavoritePizza(pizzaId, userId) {
  console.log('userId', userId)
  let config = {
    url: `/profile/favorites/${userId}`,
    method: 'delete',
    data: {
      pizzaId
    }
  };
  callApi(config, (response) => {

  }, error => console.log(error));
}