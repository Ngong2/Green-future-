const Post = require('../models/Post');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

// @desc    Get all published posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query = { published: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search by title or content
    if (search) {
      query.$text = { $search: search };
    }

    const posts = await Post.find(query)
      .populate('author', 'name')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment view count
    if (post.published) {
      post.views += 1;
      await post.save();
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, category, published } = req.body;
    // Parse tags if sent (could be JSON string or array)
    let tags = [];
    if (req.body.tags) {
      try {
        tags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags;
        if (!Array.isArray(tags)) tags = [];
        tags = tags.map(t => String(t).trim()).filter(Boolean);
      } catch (e) {
        tags = [];
      }
    }

    const postData = {
      title,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      category,
      author: req.user._id,
      published: published || false,
      tags
    };

    // Keep the first image as the featured image for existing list views.
    const uploadedImages = req.files?.images || req.files?.image || [];
    if (uploadedImages.length) {
      postData.images = uploadedImages.map(file => `/uploads/${file.filename}`);
      postData.image = postData.images[0];
    }

    // Set published date if publishing
    if (published) {
      postData.publishedAt = Date.now();
    }

    const post = await Post.create(postData);

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { title, content, excerpt, category, published } = req.body;

    // Update fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt || post.excerpt;
    post.category = category || post.category;
    // Update tags if provided
    if (req.body.tags !== undefined) {
      try {
        let tags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags;
        if (!Array.isArray(tags)) tags = [];
        tags = tags.map(t => String(t).trim()).filter(Boolean);
        post.tags = tags;
      } catch (e) {
        // ignore malformed tags
      }
    }

    // Handle image update
    if (req.file) {
      const oldImages = new Set([...(post.images || []), post.image].filter(Boolean));
      for (const image of oldImages) {
        const oldImagePath = path.join(__dirname, '../', image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      post.image = `/uploads/${req.file.filename}`;
      post.images = [post.image];
    }

    // Handle publish status change
    if (published !== undefined && published !== post.published) {
      post.published = published;
      if (published) {
        post.publishedAt = Date.now();
      } else {
        post.publishedAt = null;
      }
    }

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    // Delete associated images, including the legacy featured image if needed.
    const imagePaths = new Set([...(post.images || []), post.image].filter(Boolean));
    for (const image of imagePaths) {
      const imagePath = path.join(__dirname, '../', image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await post.deleteOne();

    res.json({ message: 'Post removed successfully' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Toggle publish status
// @route   PATCH /api/posts/:id/publish
// @access  Private
const togglePublish = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Not authorized to modify this post' });
    }

    post.published = !post.published;
    if (post.published) {
      post.publishedAt = Date.now();
    } else {
      post.publishedAt = null;
    }

    await post.save();

    res.json({ published: post.published });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all posts for admin
// @route   GET /api/posts/admin/all
// @access  Private
const getAdminPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  togglePublish,
  getAdminPosts
};