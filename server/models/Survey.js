const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  question: String,
  response: String,
  date: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
}, { timestamps: true });

module.exports = mongoose.model('Survey', surveySchema);
