const express = require('express');
const Illness = require('../models/Illness');
const router = express.Router();

// @route   GET /api/illnesses
// @desc    Get all illnesses with pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;
    const search = req.query.search;

    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    const illnesses = await Illness.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ name: 1 });

    const total = await Illness.countDocuments(query);

    res.json({
      illnesses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get illnesses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/illnesses/categories
// @desc    Get all illness categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Illness.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/illnesses/:id
// @desc    Get illness by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const illness = await Illness.findById(req.params.id);
    
    if (!illness) {
      return res.status(404).json({ message: 'Illness not found' });
    }

    res.json(illness);
  } catch (error) {
    console.error('Get illness error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/illnesses/slug/:slug
// @desc    Get illness by name (case insensitive)
// @access  Public
router.get('/name/:name', async (req, res) => {
  try {
    const illness = await Illness.findOne({
      name: { $regex: new RegExp(req.params.name, 'i') },
      isActive: true
    });
    
    if (!illness) {
      return res.status(404).json({ message: 'Illness not found' });
    }

    res.json(illness);
  } catch (error) {
    console.error('Get illness by name error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
