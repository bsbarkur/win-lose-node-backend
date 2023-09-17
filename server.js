// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const port = 3001; // or any port you prefer

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect("mongodb://localhost/winlosedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connected to MongoDB database");
});

// Define a schema for your data (adjust as per your data structure)
const dataSchema = new mongoose.Schema({
  labels: [String],
  winData: [Number],
  loseData: [Number],
});

// Create a model based on the schema
const Data = mongoose.model("Data", dataSchema);

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Define a route to retrieve the data
app.get("/win-lose-data", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const data = await Data.findOne(); // Assuming you have only one document in your collection

    if (!data) {
      res.status(404).json({ message: "Data not found" });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
