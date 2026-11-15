const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: { 
    type: String, 
    required: [true, 'Please provide content'] 
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot be more than 500 characters']
  },
  category: { 
    type: String, 
    enum: ['News', 'Events', 'Announcements', 'Stories', 'Emergency Updates', 'Resources', 'General'],
    default: 'General'
  },
  image: { 
    type: String,
    default: null 
  },
  images: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  published: { 
    type: Boolean, 
    default: false 
  },
  publishedAt: { 
    type: Date 
  },
  views: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

// Create text index for search
PostSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Post', PostSchema);