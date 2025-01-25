import dotenv from 'dotenv';
import express from 'express';
import { loginUser, createUser, enforceAuth } from './middleware/auth.js';
import { generateImage } from './middleware/image.js';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(express.json());

const corsOptions = {
  origin:  'https://imagegenai-5hdx.onrender.com/', // Domena frontendu
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// 
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

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

app.post('/generate-image', enforceAuth, async (req, res) => {
  const { prompt, options } = req.body; //options => aspect ratio, format, quality

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).send({ error: 'Prompt is required' });
  }

  const { image, format } = await generateImage(prompt, options);
  res.type(format);
  res.status(201).send(image);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port} `));
