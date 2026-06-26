import { cloudinary } from '../config/cloudinary.js';

// POST /api/upload
export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploaded = req.files.map((f) => ({
      url: f.path,          // secure_url from Cloudinary
      publicId: f.filename, // public_id from Cloudinary
    }));

    res.json({ images: uploaded });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ message: err.message || 'Upload failed' });
  }
};

// DELETE /api/upload/:publicId
export const deleteImage = async (req, res) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);
    await cloudinary.v2.uploader.destroy(publicId, { invalidate: true });
    res.json({ message: 'Image deleted from Cloudinary' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ message: err.message || 'Delete failed' });
  }
};
