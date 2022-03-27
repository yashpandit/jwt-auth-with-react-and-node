const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PORT, posts, users } = require('./constants');

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    users.push({ name, password: hashedPassword });
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post('/users/login', async (req, res) => {
  const { name, password } = req.body;
  
  const user = users.find(user => user.name === name);

  if (!user) {
    return res.status(400).send('Could not find user');
  }

  try {
    const isValidUser = await bcrypt.compare(password, user.password);

    if (isValidUser) {
      res.send('Success');
    } else {
      res.send('Not allowed');
    }
  } catch {
    res.status(500).send();
  }
});

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.listen(PORT);
