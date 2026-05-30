const Product = require("../models/product");
const Sale = require("../models/sale");

//create product
const createProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      quantity,
    });
    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//retrieve all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//retrieving a single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: `No product matches ID ${id}.` });
    }
    res.status(200).json(product);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: err.message });
  }
};

//delete a product
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update a product by ID
const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//sell a product
const sellProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    //find the product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //validate product quantity isn't 0 or less
    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }

    //check stock availability
    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    //reduce stock
    product.quantity -= quantity;
    //save product
    await product.save();
    //create sale record
    await Sale.create({
      productId: product._id,
      quantitySold: quantity,
    });

    res.status(200).json({ message: "Product sold successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//restock products
const restockProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity: addedAmount } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    //validate product quantity isn't 0 or less
    if (addedAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Restock amount must be greater than 0" });
    }
    //increase stock
    product.quantity += addedAmount;

    await product.save();
    res
      .status(200)
      .json({ message: "Product restocked successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  sellProduct,
  restockProduct,
};
