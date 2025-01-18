const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (password.length < 7) {
      return res.status(400).send({ error: 'Password must be at least 7 characters long' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '24h' });
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
