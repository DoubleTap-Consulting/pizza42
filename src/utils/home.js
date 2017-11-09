import callApi from 'utils/api';

export function favoritePizza(pizzaId, userId) {
  const config = {
    url: `/profile/favorites/${userId}`,
    method: 'post',
    data: {
      pizzaId,
    },
  };
  callApi(config, () => { }, error => console.log(error));
}

export function unfavoritePizza(pizzaId, userId) {
  const config = {
    url: `/profile/favorites/${userId}`,
    method: 'delete',
    data: {
      pizzaId,
    },
  };
  callApi(config, () => { }, error => console.log(error));
}
