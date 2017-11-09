import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://ec2-54-183-30-7.us-west-1.compute.amazonaws.com:3001/api/',
  timeout: 9000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

function callApi(
  config,
  onRequestSuccess,
  onRequestFailure,
) {
  return axios.request(config)
    .then(res => onRequestSuccess(res.data))
    .catch(error => onRequestFailure(error.response));
}

/**
 * A wrapper that adds the JWT token.
 * @param {*} configObject
 * @param {*} request
 * @param {*} onRequestSuccess
 * @param {*} onRequestFailure
 */
export default function callApiWithJWT(
  configObject,
  onRequestSuccess,
  onRequestFailure,
) {
  const token = localStorage.getItem('access_token');
  const config = configObject;
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${token}`;

  return callApi(
    config,
    onRequestSuccess,
    onRequestFailure,
  );
}
