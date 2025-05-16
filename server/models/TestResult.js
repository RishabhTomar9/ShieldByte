const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['typing', 'speed'], required: true },
  download: Number,
  upload: Number,
  wpm: Number,
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Test', testSchema);
