const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    school: { type: String, required: true, trim: true },
    program: { type: String, required: true, trim: true },
    credential: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);