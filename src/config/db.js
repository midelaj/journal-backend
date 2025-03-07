const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("mongodb connected successfully"))
      .catch((err) => console.log("Database connection failed", err));

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
