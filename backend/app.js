import express from 'express';
import { loginUser, createUser } from './auth.js';

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const token = createUser(email, password);
    res.status(201).send({ message: 'User created', token });
  } catch (error) {
    res.status(400).send({ error: 'Creating user failed, invalid credentials' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    loginUser(email, password);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port} `));
