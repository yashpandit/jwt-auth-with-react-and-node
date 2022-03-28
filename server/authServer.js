const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');
const { users, refreshTokens, AUTH_PORT } = require('./constants');
const { generateAccessToken, generateRefreshToken } = require('./utils/generateTokens');
const { generateHashedPassword } = require('./utils/generateHashedPassword');
const { verifyRefreshToken } = require('./utils/verifyTokens');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
  res.json({ data: users });
});

app.post('/users', async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashedPassword = await generateHashedPassword(password);
    users.push({ name, password: hashedPassword });
    res.status(201).json({ data: 'User created' });
  } catch {
    res.status(500).json({ err: 'Internal server error' });
  }
});

// create a new access token once the old one has expired
app.post('/refresh-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ err: 'Unauthorized' });
  }

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ err: 'Unauthorized' });
  }

  verifyRefreshToken(
    token,
    (err, user) => {
    if (err) {
      return res.status(403).json({ err: 'Unauthorized' });
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
    return res.status(404).json({ err: 'Could not find user' });
  }

  try {
    const isValidUser = await bcrypt.compare(password, user.password);

    if (isValidUser) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.json({ accessToken, refreshToken });
    } else {
      res.status(403).json({ err: 'Not allowed' });
    }
  } catch {
    res.status(500).json({ err: 'Internal server error' });
  }
});

app.listen(AUTH_PORT, () => console.log(`listening on port ${AUTH_PORT}`));
