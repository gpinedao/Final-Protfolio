const Education = require('../models/education.model');

// CREATE
exports.createEducation = async (req, res) => {
  try {
    const { school, program, credential, date } = req.body;
    if (!school || !program || !credential || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newEducation = new Education({ school, program, credential, date });
    const saved = await newEducation.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating education:', err);
    res.status(500).json({ message: 'Server error creating education' });
  }
};

// READ ALL
exports.getEducations = async (req, res) => {
  try {
    const educations = await Education.find();
    res.status(200).json(educations);
  } catch (err) {
    console.error('Error fetching educations:', err);
    res.status(500).json({ message: 'Server error fetching educations' });
  }
};

// READ ONE
exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.status(200).json(education);
  } catch (err) {
    console.error('Error fetching education by ID:', err);
    res.status(500).json({ message: 'Server error fetching education' });
  }
};

// UPDATE
exports.updateEducation = async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEducation) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.status(200).json(updatedEducation);
  } catch (err) {
    console.error('Error updating education:', err);
    res.status(400).json({ message: 'Error updating education entry' });
  }
};

// DELETE
exports.deleteEducation = async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.status(200).json({ message: 'Education entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting education:', err);
    res.status(500).json({ message: 'Server error deleting education' });
  }
};