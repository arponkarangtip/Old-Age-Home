/*
Seed script - creates admin, staff and resident users and sample residents.
Run: node seed.js
*/
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Resident = require('./models/Resident');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/old_age_home_roles';

async function run(){
  await mongoose.connect(MONGO);
  await User.deleteMany({});
  await Resident.deleteMany({});

  const passAdmin = await bcrypt.hash('admin123', 10);
  const passStaff = await bcrypt.hash('staff123', 10);
  const passResident = await bcrypt.hash('resident123', 10);

  const admin = await User.create({ name:'Admin', email:'admin@example.com', password:passAdmin, role:'admin' });
  const staff = await User.create({ name:'Staff', email:'staff@example.com', password:passStaff, role:'staff' });
  const residentUser = await User.create({ name:'ResidentUser', email:'resident@example.com', password:passResident, role:'resident' });

  // create resident records (one linked to residentUser)
  const res1 = await Resident.create({ name:'Rahim Ahmed', age:75, medical:'Hypertension', room:'A1', linkedUser: residentUser._id });
  const res2 = await Resident.create({ name:'Fatima Begum', age:82, medical:'Diabetes', room:'B2' });

  console.log('Seeded users:');
  console.log('admin@example.com / admin123 (role: admin)');
  console.log('staff@example.com / staff123 (role: staff)');
  console.log('resident@example.com / resident123 (role: resident)');
  process.exit();
}

run();
