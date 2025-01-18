import express from 'express';
import { loginUser, createUser } from './routes/auth.js';
import { generateImage } from './middleware/image.js';

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
    res
      .status(400)
      .send({ error: 'Creating user failed, invalid credentials' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = loginUser(email, password);
    res.status(200).send({ message: 'User loggded in', token });
  } catch (error) {
    if (error.status === 400) {
      return res
        .status(400)
        .send({ error: 'Login failed, please check your credentials' });
    }
  }
});

app.post('/generate-image', async (req, res) => {
  const { promt, options } = req.body; //options => aspect ratio, format, quality
  await generateImage(promt, options);
  res.status(201).send({message: 'Image generated'})
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port} `));
