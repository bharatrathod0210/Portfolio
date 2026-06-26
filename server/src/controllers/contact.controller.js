import nodemailer from 'nodemailer';
import Contact from '../models/Contact.model.js';

export const sendContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) return res.status(400).json({ message: 'All fields required' });
  const contact = await Contact.create({ name, email, subject, message });
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, port: process.env.EMAIL_PORT, secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `[Portfolio] ${subject} — from ${name}`,
      html: `<div style="font-family:sans-serif;max-width:600px"><h2>New Message</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Subject:</b> ${subject}</p><hr/><p>${message.replace(/\n/g,'<br/>')}</p></div>`,
    });
  } catch (e) { console.error('Email error:', e.message); }
  res.status(201).json({ message: 'Message sent!', id: contact._id });
};

export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

export const markRead = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!contact) return res.status(404).json({ message: 'Not found' });
  res.json(contact);
};

export const toggleStar = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: 'Not found' });
  contact.starred = !contact.starred;
  await contact.save();
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
