const express = require('express');
const { authenticateToken } = require('./middlewares/authenticateToken');
const { PORT, posts } = require('./constants');

const app = express();

app.use(express.json());

app.get('/posts', authenticateToken, (req, res) => {
  const { name } = req.user;
  const currentUserPosts =
    posts.filter(post => post.name === name);
  res.json(currentUserPosts);
});

app.listen(PORT);
