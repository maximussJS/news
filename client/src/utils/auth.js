const Authenticate = token => localStorage.setItem('token', token);

const Deauthenticate = () => localStorage.removeItem('token')

const getToken = () => localStorage.getItem('token');

const isAuthenticated = () => localStorage.getItem('token') !== null;

module.exports = {
  Authenticate,
  Deauthenticate,
  getToken,
  isAuthenticated
}