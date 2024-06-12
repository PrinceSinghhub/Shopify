import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Shopify")
  .then(() => {
    console.log("MongoDB connected");
    // Insert default products after DB connection and before starting the server
    insertDefaultProducts();
  })
  .catch((err) => console.error(err));

// Define Mongoose Schema and Model
const storageSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    detail: String,
    price: Number,
    img: String,
  },
  { timestamps: true }
);

const Storage = mongoose.model("Storage", storageSchema);

// Define default products
const defaultProducts = [
  {
    id: 1,
    name: "Product 1",
    detail: "This is product 1",
    price: 100,
    img: "https://picsum.photos/500/500?random=1",
  },
  {
    id: 2,
    name: "Product 2",
    detail: "This is product 2",
    price: 200,
    img: "https://picsum.photos/500/500?random=2",
  },
  {
    id: 3,
    name: "Product 3",
    detail: "This is product 3",
    price: 300,
    img: "https://picsum.photos/500/500?random=3",
  },
];

// Function to insert default products if the collection is empty
async function insertDefaultProducts() {
  const existingCount = await Storage.countDocuments();
  if (existingCount === 0) {
    await Storage.insertMany(defaultProducts);
    console.log("Default products inserted into the database.");
  } else {
    console.log("Database already initialized with products.");
  }
}

// Set up Express Server
const app = express();
app.use(cors());
app.use(bodyParser.json());

// CRUD API Endpoints
// Create
app.post("/api/storage", async (req, res) => {
  try {
    const newItem = new Storage(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all items
app.get("/api/storage", async (req, res) => {
  try {
    const items = await Storage.find();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read single item by id
app.get("/api/storage/:id", async (req, res) => {
  try {
    const item = await Storage.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).send();
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
app.put("/api/storage/:id", async (req, res) => {
  try {
    const item = await Storage.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!item) {
      return res.status(404).send();
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete
app.delete("/api/storage/:id", async (req, res) => {
  try {
    const item = await Storage.findOneAndDelete({ id: req.params.id });
    if (!item) {
      return res.status(404).send();
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server on an available port
const PORT = 3001;
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is already in use, trying another port...`);
      app.listen(PORT + 1, () => {
        console.log(`Server is now running on port ${PORT + 1}`);
      });
    } else {
      console.error(err);
    }
  });
