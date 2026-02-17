const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password -verificationToken -resetPasswordToken');
    
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  auth,
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().trim(),
  validate
], async (req, res) => {
  try {
    const updates = {};
    const allowedUpdates = ['name', 'phone', 'location', 'preferences'];
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -verificationToken -resetPasswordToken');

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/user/scan-history
// @desc    Add scan to history
// @access  Private
router.post('/scan-history', auth, async (req, res) => {
  try {
    const { symptoms, predictions } = req.body;
    
    const user = await User.findById(req.user._id);
    user.scanHistory.unshift({
      symptoms,
      predictions,
      timestamp: new Date()
    });
    
    // Keep only last 50 scans
    if (user.scanHistory.length > 50) {
      user.scanHistory = user.scanHistory.slice(0, 50);
    }
    
    await user.save();
    res.json({ message: 'Scan saved to history', scanHistory: user.scanHistory });
  } catch (error) {
    console.error('Save scan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/user/scan-history
// @desc    Get scan history
// @access  Private
router.get('/scan-history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('scanHistory');
    res.json(user.scanHistory);
  } catch (error) {
    console.error('Get scan history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/user/favorite-doctors
// @desc    Add doctor to favorites
// @access  Private
router.post('/favorite-doctors', auth, async (req, res) => {
  try {
    const { doctorId, name, specialty } = req.body;
    
    const user = await User.findById(req.user._id);
    
    // Check if already favorited
    const exists = user.favoriteDoctors.some(d => d.doctorId === doctorId);
    if (exists) {
      return res.status(400).json({ message: 'Doctor already in favorites' });
    }
    
    user.favoriteDoctors.push({ doctorId, name, specialty });
    await user.save();
    
    res.json({ message: 'Doctor added to favorites', favorites: user.favoriteDoctors });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/user/favorite-doctors
// @desc    Get favorite doctors
// @access  Private
router.get('/favorite-doctors', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('favoriteDoctors');
    res.json(user.favoriteDoctors);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/user/favorite-doctors/:doctorId
// @desc    Remove doctor from favorites
// @access  Private
router.delete('/favorite-doctors/:doctorId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favoriteDoctors = user.favoriteDoctors.filter(
      d => d.doctorId !== req.params.doctorId
    );
    await user.save();
    
    res.json({ message: 'Doctor removed from favorites', favorites: user.favoriteDoctors });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
