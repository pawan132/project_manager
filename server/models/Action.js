const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Action', actionSchema);
