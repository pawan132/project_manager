const mongoose = require('mongoose');

const expenditureSchema = new mongoose.Schema({
  item: String,
  amount: Number,
  date: Date,
  category: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
}, { timestamps: true });

module.exports = mongoose.model('Expenditure', expenditureSchema);

