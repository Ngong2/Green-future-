const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const { 
  getPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost,
  togglePublish,
  getAdminPosts
} = require('../controllers/post.controller');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Validation rules
const postValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').optional().isIn([
    'News',
    'Events',
    'Announcements',
    'Stories',
    'Emergency Updates',
    'Resources'
  ])
];

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected routes
router.get('/admin/all', protect, adminOnly, getAdminPosts);
router.post(
  '/',
  protect,
  adminOnly,
  upload.fields([{ name: 'images', maxCount: 5 }, { name: 'image', maxCount: 1 }]),
  postValidation,
  createPost
);
router.put('/:id', protect, adminOnly, upload.single('image'), postValidation, updatePost);
router.delete('/:id', protect, adminOnly, deletePost);
router.patch('/:id/publish', protect, adminOnly, togglePublish);

module.exports = router;
