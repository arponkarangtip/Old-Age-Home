require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const residentRoutes = require('./routes/residents');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/residents', residentRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/old_age_home_roles';

mongoose.connect(MONGO).then(()=> {
  console.log('Connected to MongoDB');
  app.listen(PORT, ()=> console.log('Server listening on', PORT));
}).catch(err=> {
  console.error('DB connect error', err);
});
