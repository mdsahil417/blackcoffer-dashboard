const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dataRoutes = require("./routes/dataRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/data", dataRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/blackcoffer")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});