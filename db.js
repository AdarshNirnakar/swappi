const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports=db;