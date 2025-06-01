const mongoose = require('mongoose');

const researchNoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('ResearchNote', researchNoteSchema);
