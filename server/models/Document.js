const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: String,
  description: String,
  size: {
    type: Number, // in bytes
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  filePath: {
    type: String, // path or URL to uploaded file
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
