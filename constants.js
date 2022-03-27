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

module.exports = { PORT, AUTH_PORT, posts, users, refreshTokens };
