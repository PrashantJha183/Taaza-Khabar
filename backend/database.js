const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/Taaza-Khabar";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected with MongoDB successfully");
  } catch (error) {
    console.log("Failed to connect", error.message);
  }
};
module.exports = connectToMongo;
