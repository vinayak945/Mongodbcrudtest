const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const server = express();
const port = 8080;

// Middleware
server.use(cors());
server.use(express.json()); // Middleware to parse JSON request bodies
server.use(express.static('build'))

// MongoDB connection
async function database() {
  try {
    await mongoose.connect("mongodb+srv://vinayak92010:vinayak92010@cluster0.oztcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

database();

// Define Schema and Model
const { Schema } = mongoose;
const studentSchema = new Schema({
  title: String,
  age: {
    type: Number,
    min: [18, "Too young"],
    unique: true,
    default:0
  },
});

const Product = mongoose.model("Product", studentSchema);

// Routes

// Create a new product
server.post("/create", async (req, res) => {
  try {
    const pro = new Product({
      title: req.body.title || "Hello",
      age: req.body.age || 19,
    });
    await pro.save();
    res.status(201).send("Product created successfully");
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).send("Failed to create product");
  }
});

// Find products with age > 18
server.get("/find", async (req, res) => {
  try {
    const findProducts = await Product.find();
    res.json(findProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Replace a product
server.put("/replace", async (req, res) => {
  try {
    const replacedProduct = await Product.findOneAndReplace(
      { age: 19 },
      { title: req.body.title || "Bye", age: req.body.age || 20 },
      { upsert: true, new: true }
    );
    res.json(replacedProduct);
  } catch (error) {
    console.error("Error replacing product:", error);
    res.status(500).send("Failed to replace product");
  }
});

// Update a product
server.patch("/update/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, age: req.body.age },
      { new: true } // Return the updated document
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// Delete a product
// Delete a product based on title received from the client
server.delete("/delete", async (req, res) => {
  try {
    const { title } = req.body; // Ensure title is received correctly
    const deletedProduct = await Product.findOneAndDelete({ title });
    if (deletedProduct) {
      res.json({ message: "Product deleted successfully", deletedProduct });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});


// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
