const mongoose = require('mongoose');

const researchNoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
}, { timestamps: true });

module.exports = mongoose.model('ResearchNote', researchNoteSchema);

