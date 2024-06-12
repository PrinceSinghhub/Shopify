import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Shopify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define the Schema
const loginDataSchema = new mongoose.Schema({
  name: String,
  emailid: String,
  password: String,
});

// Create the Model
const LoginData = mongoose.model("LoginData", loginDataSchema);

// Initialize Express app
const app = express();

// Use cors and body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// Define the route for the login endpoint
app.post("/login", async (req, res) => {
  const { emailid, password } = req.body;
  try {
    const user = await LoginData.findOne({ emailid, password });
    if (user) {
      // Include the user's name in the response
      res.json({ success: true, message: "Login successful", name: user.name });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET route to fetch all login data
app.get("/login", async (req, res) => {
  try {
    const data = await LoginData.find(); // Fetch all login data
    res.json(data); // Send data as JSON
  } catch (error) {
    res.status(500).send(error); // Send error if something goes wrong
  }
});

// POST route to register a new user
app.post("/register", async (req, res) => {
  const { name, emailid, password } = req.body; // Extract name, emailid, and password from request body
  try {
    // Check if user already exists
    const existingUser = await LoginData.findOne({ emailid });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // Create a new user if not already exists
    const newUser = new LoginData({ name, emailid, password });
    await newUser.save(); // Save the new user to the database
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).send(error); // Send error if something goes wrong
  }
});

// Start the server on an available port
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
