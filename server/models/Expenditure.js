const mongoose = require('mongoose');

const expenditureSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Expenditure', expenditureSchema);
