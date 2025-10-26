const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'], 
    minlength: [3, 'Company name must be at least 3 characters long'] 
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'] 
  },
  applicationDate: {
    type: Date,
    required: [true, 'Application date is required'], 
    validate: {
      validator: function(date) {
        return date <= new Date();
      },
      message: 'Application date cannot be in the future'
    }
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['Applied', 'Interview', 'Offer', 'Rejected'], 
      message: '{VALUE} is not a supported status'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);