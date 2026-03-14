const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  completedDate: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Task', taskSchema);
