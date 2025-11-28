const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// login
router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ message:'User not found' });
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(400).json({ message:'Wrong credentials' });
  const token = jwt.sign({ id:user._id, role:user.role, email:user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn:'7d' });
  res.json({ token, role: user.role });
});

// optional: register (admin only) - simple example
router.post('/register', async (req,res) => {
  const { name, email, password, role } = req.body;
  if(!name || !email || !password) return res.status(400).json({ message:'Missing fields' });
  const hashed = await bcrypt.hash(password, 10);
  try {
    const u = await User.create({ name, email, password:hashed, role: role || 'resident' });
    res.json({ id: u._id, email: u.email, role: u.role });
  } catch(e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
