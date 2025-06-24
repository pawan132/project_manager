const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  task: String,
  assignedTo: String,
  dueDate: Date,
  status: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
}, { timestamps: true });

module.exports = mongoose.model('Action', actionSchema);

