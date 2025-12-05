const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },   // maps to firstName in frontend
  lastname: { type: String, required: true },    // maps to lastName in frontend
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);