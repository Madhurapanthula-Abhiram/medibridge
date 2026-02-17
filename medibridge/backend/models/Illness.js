const mongoose = require('mongoose');

const illnessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Illness name is required'],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Respiratory', 'Cardiology', 'Neurology', 'Gastroenterology', 'Dermatology', 
           'ENT', 'Urology', 'Pulmonology', 'Infectious Disease', 'Endocrinology',
           'Rheumatology', 'Ophthalmology', 'Hematology', 'General']
  },
  icon: {
    type: String,
    default: '🏥'
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  symptoms: [{
    type: String,
    required: true
  }],
  firstAid: [{
    type: String
  }],
  redFlags: [{
    type: String
  }],
  treatment: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe', 'chronic'],
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  relatedSymptoms: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search
illnessSchema.index({ name: 'text', symptoms: 'text', shortDescription: 'text' });

module.exports = mongoose.model('Illness', illnessSchema);
