const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/emergingtech";
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas / Local");
  } catch (err) {
    console.error("Could not connect to MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
