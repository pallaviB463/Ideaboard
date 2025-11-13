const express = require('express');
const Idea = require('../models/Idea');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all ideas (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = '-createdAt' } = req.query;
    
    const ideas = await Idea.find()
      .populate('author', 'name')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Idea.countDocuments();

    res.json(ideas);
  } catch (error) {
    console.error('Get ideas error:', error);
    res.status(500).json({ 
      message: 'Error fetching ideas' 
    });
  }
});

// Create new idea (requires auth)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const idea = new Idea({
      title,
      description,
      author: req.user._id
    });

    await idea.save();
    
    // Populate author info before sending response
    await idea.populate('author', 'name');

    res.status(201).json(idea);
  } catch (error) {
    console.error('Create idea error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ 
      message: 'Error creating idea' 
    });
  }
});

// Get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate('author', 'name')
      .populate('likes', 'name');

    if (!idea) {
      return res.status(404).json({ 
        message: 'Idea not found' 
      });
    }

    res.json(idea);
  } catch (error) {
    console.error('Get idea error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid idea ID' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error fetching idea' 
    });
  }
});

// Like/unlike an idea (requires auth)
router.post('/:id/like', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ 
        message: 'Idea not found' 
      });
    }

    const userId = req.user._id;
    const likeIndex = idea.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Remove like
      idea.likes.splice(likeIndex, 1);
    } else {
      // Add like
      idea.likes.push(userId);
    }

    await idea.save();
    
    // Populate author info before sending response
    await idea.populate('author', 'name');

    res.json(idea);
  } catch (error) {
    console.error('Like idea error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid idea ID' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error updating like' 
    });
  }
});

// Delete idea (only by author)
router.delete('/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ 
        message: 'Idea not found' 
      });
    }

    // Check if user is the author
    if (idea.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: 'Not authorized to delete this idea' 
      });
    }

    await Idea.findByIdAndDelete(req.params.id);
    
    res.json({ 
      message: 'Idea deleted successfully' 
    });
  } catch (error) {
    console.error('Delete idea error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid idea ID' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error deleting idea' 
    });
  }
});

// Get user's ideas (requires auth)
router.get('/user/me', auth, async (req, res) => {
  try {
    const ideas = await Idea.find({ author: req.user._id })
      .populate('author', 'name')
      .sort('-createdAt');

    res.json(ideas);
  } catch (error) {
    console.error('Get user ideas error:', error);
    res.status(500).json({ 
      message: 'Error fetching user ideas' 
    });
  }
});

module.exports = router;