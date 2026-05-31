const Product = require("../models/product");
const Sale = require("../models/sale");
const Restock = require("../models/restock");

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
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
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
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: err.message });
  }
};

//sell a product
const sellProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    //validate product quantity isn't 0 or less
    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }
    //find the product and update
    const product = await Product.findOneAndUpdate(
      {
        _id: id,
        quantity: { $gte: quantity },
      },
      {
        $inc: { quantity: -quantity },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!product) {
      return res
        .status(400)
        .json({ message: "Product not found or insufficient stock" });
    }
    //create sale record
    await Sale.create({
      productId: product._id,
      productName: product.name,
      priceAtSale: product.price,
      stockAfterSale: product.quantity,
      stockBeforeSale: product.quantity + quantity,
      quantitySold: quantity,
    });

    res.status(200).json({ message: "Product sold successfully", product });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: err.message });
  }
};

//restock products
const restockProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const addedAmount = Number(req.body.quantity);

    //validate product quantity isn't 0 or less
    if (isNaN(addedAmount) || addedAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Restock amount must be greater than 0" });
    }
    //find and increment
    const product = await Product.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $inc: { quantity: addedAmount },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    //restock history snapshots
    await Restock.create({
      productId: product._id,
      productName: product.name,
      stockBeforeRestock: product.quantity - addedAmount,
      stockAfterRestock: product.quantity,
      quantityAdded: addedAmount,
    });

    res
      .status(200)
      .json({ message: "Product restocked successfully", product });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: err.message });
  }
};

//Get Low stock products
const getLowStockProducts = async (req, res) => {
  try {
    const threshold =
      req.query.threshold !== undefined ? Number(req.query.threshold) : 5;

    if (isNaN(threshold) || threshold < 0) {
      return res.status(400).json({
        message: "Threshold must be a non-negative number",
      });
    }
    const products = await Product.find({
      quantity: { $lte: threshold },
    });
    res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
  getLowStockProducts,
};
