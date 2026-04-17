const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Debug: Check if MONGO_URI is loaded
    console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'NOT LOADED');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined');
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('✗ Database connection error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verify MONGO_URI in .env has correct password');
    console.log('2. Check MongoDB Atlas network access settings (allow 0.0.0.0/0)');
    console.log('3. Verify MONGO_URI format: mongodb+srv://user:password@cluster.mongodb.net/dbname');
    console.log('\n⚠️ Backend will start but DB operations will fail until connection is fixed\n');
    return false;
  }
};

module.exports = connectDB;
