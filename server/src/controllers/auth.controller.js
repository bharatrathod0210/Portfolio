import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.model.js';

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  let admin = await Admin.findOne({ email });
  if (!admin) {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      admin = await Admin.create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, name: 'Bharat Rathod' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  const match = await admin.comparePassword(password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ _id: admin._id, name: admin.name, email: admin.email, token: genToken(admin._id) });
};

export const getMe = async (req, res) => {
  res.json({ _id: req.admin._id, name: req.admin.name, email: req.admin.email });
};
