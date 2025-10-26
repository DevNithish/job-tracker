const Application = require('../models/Application');

exports.createApplication = async (req, res) => {
  try {
    const { companyName, jobTitle, applicationDate, status } = req.body;

    if (new Date(applicationDate) > new Date()) {
      return res.status(400).json({ 
        message: 'Application date cannot be in the future' 
      });
    }

    const newApplication = new Application({
      companyName,
      jobTitle,
      applicationDate,
      status
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication); 

  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Error creating application', error });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ applicationDate: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application', error });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { companyName, jobTitle, applicationDate, status } = req.body;

    if (new Date(applicationDate) > new Date()) {
      return res.status(400).json({ 
        message: 'Application date cannot be in the future' 
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { companyName, jobTitle, applicationDate, status },
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Error updating application', error });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application', error });
  }
};