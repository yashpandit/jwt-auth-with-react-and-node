const PORT = 3000;
const AUTH_PORT = 4000;

const posts = [{
  name: 'yash',
  title: 'Post1',
}, {
  name: 'anurag',
  title: 'Post2',
}, {
  name: 'aditya',
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
