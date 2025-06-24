const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  quantity: Number,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
}, { timestamps: true });

module.exports = mongoose.model('Equipment', equipmentSchema);
