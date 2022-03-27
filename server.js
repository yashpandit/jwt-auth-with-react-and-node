const express = require('express');
const app = express();
const PORT = 3000;
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

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.listen(PORT);
