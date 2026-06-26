import express from 'express';
import multer from 'multer';
import { upload } from '../config/cloudinary.js';
import { uploadImages, deleteImage } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Multer error handler — returns JSON instead of crashing
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

router.post(
  '/',
  protect,
  (req, res, next) => {
    upload.array('images', 10)(req, res, (err) => {
      if (err) return handleMulterError(err, req, res, next);
      next();
    });
  },
  uploadImages
);

router.delete('/:publicId', protect, deleteImage);

export default router;
