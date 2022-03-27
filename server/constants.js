const PORT = 3000;
const AUTH_PORT = 4000;

const posts = [{
  name: 'Yash',
  title: 'Post1',
}, {
  name: 'Anurag',
  title: 'Post2',
}, {
  name: 'Aditya',
  title: 'Post3',
}];

const users = [];

const refreshTokens = [];

const AUTHORIZATION_HEADER = 'authorization';

module.exports = {
  AUTHORIZATION_HEADER,
  PORT,
  AUTH_PORT,
  posts,
  users,
  refreshTokens,
};
