import mongoose from 'mongoose';

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`✅ MongoDB: ${conn.connection.host}`);
  // Return conn so callers can .then() after connection is established
  return conn;
};
