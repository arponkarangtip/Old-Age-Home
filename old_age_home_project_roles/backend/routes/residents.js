const express = require('express');
const router = express.Router();
const Resident = require('../models/Resident');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

// List residents - only staff and admin
router.get('/', auth, requireRole(['staff','admin']), async (req,res) => {
  const list = await Resident.find().sort({ createdAt:-1 });
  res.json(list);
});

// Create resident - only staff and admin
router.post('/', auth, requireRole(['staff','admin']), async (req,res) => {
  const r = new Resident(req.body);
  await r.save();
  res.json(r);
});

// Get single resident - any authenticated user can view (resident can view their own via linkedUser in future)
router.get('/:id', auth, async (req,res) => {
  const r = await Resident.findById(req.params.id);
  if(!r) return res.status(404).json({ message:'Not found' });
  res.json(r);
});

// Update - only staff and admin
router.put('/:id', auth, requireRole(['staff','admin']), async (req,res) => {
  const r = await Resident.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(r);
});

// Delete - only admin (more restrictive)
router.delete('/:id', auth, requireRole(['admin']), async (req,res) => {
  await Resident.findByIdAndDelete(req.params.id);
  res.json({ success:true });
});

module.exports = router;
