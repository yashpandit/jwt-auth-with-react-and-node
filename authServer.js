require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const { users, refreshTokens, AUTH_PORT } = require('./constants');
const { generateAccessToken, generateRefreshToken } = require('./utils/generateTokens');
const { generateHashedPassword } = require('./utils/generateHashedPassword');
const { verifyRefreshToken } = require('./utils/verifyRefreshToken');

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashedPassword = await generateHashedPassword(password);
    users.push({ name, password: hashedPassword });
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

// create a new access token once the old one has expired
app.post('/token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  verifyRefreshToken(token, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    // take out only name as the user object will also have additional info
    // such as subject, creation date, etc.
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

// remove refresh token
app.delete('/logout', async (req, res) => {
  refreshTokens.filter(token => token !== req.body.token);
  res.sendStatus(204);
});

// Authenticate the user
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  const user = users.find(user => user.name === name);

  if (!user) {
    return res.status(400).send('Could not find user');
  }

  try {
    const isValidUser = await bcrypt.compare(password, user.password);

    if (isValidUser) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.json({ accessToken, refreshToken });
    } else {
      res.send('Not allowed');
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(AUTH_PORT);
