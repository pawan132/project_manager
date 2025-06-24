const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
  survey: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Survey' }],
  expenditure: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expenditure' }],
  researchNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ResearchNote' }],
  actions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Action' }],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
