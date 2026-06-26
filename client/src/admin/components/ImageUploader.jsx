import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../utils/api';

export default function ImageUploader({ images = [], onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = async (files) => {
    if (!files.length) return;
    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append('images', f));
    try {
      // Do NOT set Content-Type manually — axios must auto-set it with the
      // correct multipart boundary, otherwise multer can't parse the body.
      const res = await api.post('/upload', formData);
      onChange([...images, ...res.data.images]);
      toast.success(`${files.length} image(s) uploaded`);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Upload failed';
      toast.error(`Upload failed: ${msg}`);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removeImage = async (img, index) => {
    if (img.publicId) {
      try { await api.delete(`/upload/${encodeURIComponent(img.publicId)}`); } catch {}
    }
    onChange(images.filter((_, i) => i !== index));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onClick={() => fileRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          dragOver
            ? 'border-purple-500/60 bg-purple-500/10'
            : 'border-white/10 hover:border-purple-500/30 hover:bg-white/3'
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/40 text-sm">Uploading to Cloudinary...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-1">
              <FiUpload size={22} className="text-white/30" />
            </div>
            <p className="text-white/50 text-sm">
              Drop images here or <span className="text-purple-400">click to upload</span>
            </p>
            <p className="text-white/20 text-xs">JPG, PNG, WebP — max 5MB each</p>
          </div>
        )}
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          <AnimatePresence>
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-video rounded-lg overflow-hidden border border-white/10"
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
                {/* Cover badge */}
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 text-xs bg-purple-500/80 px-1.5 py-0.5 rounded text-white font-mono">
                    Cover
                  </span>
                )}
                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeImage(img, i)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  aria-label="Remove"
                >
                  <FiX size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {images.length === 0 && (
        <div className="flex items-center gap-2 text-white/20 text-xs">
          <FiImage size={12} />
          No images uploaded yet
        </div>
      )}
    </div>
  );
}
