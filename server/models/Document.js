const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['pdf', 'docx', 'jpg', 'png'], // restrict file types
      required: true,
    },
    name: { type: String, required: true },
    category: { type: String, index: true },
    description: String,
    size: { type: Number, required: true }, // bytes
    uploadDate: { type: Date, default: Date.now },

    filePath: {
      type: String,
      required: true,
      match: /^https?:\/\//, // optional validation
    },

    // ✅ Link to Project
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  { timestamps: true }
);

// Virtual to get file size in MB
documentSchema.virtual('sizeInMB').get(function () {
  return (this.size / (1024 * 1024)).toFixed(2);
});

documentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Document', documentSchema);

