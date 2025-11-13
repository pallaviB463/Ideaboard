const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Update likesCount when likes array changes
ideaSchema.pre('save', function(next) {
  this.likesCount = this.likes.length;
  next();
});

// Index for better query performance
ideaSchema.index({ createdAt: -1 });
ideaSchema.index({ likesCount: -1 });

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;