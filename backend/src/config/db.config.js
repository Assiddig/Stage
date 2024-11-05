const mongoose  = require("mongoose");

const mongoURI = 'mongodb://0.0.0.0:27017/creasdv';
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};
module.exports = connectDB;



