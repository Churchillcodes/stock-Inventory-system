const products = require("../data/products");

//create product
const createProduct = (req, res) => {
  const { name, price, quantity } = req.body;

  const newProduct = {
    id: Date.now().toString(),
    name,
    price,
    quantity,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

//retrieve all products
const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

//retrieving a single product by ID
const getProductById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product ID required" });
  }
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res
      .status(404)
      .json({ message: `No product matches ID ${req.params.id}.` });
  }
  res.status(200).json(product);
};

//delete a product
const deleteProductById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product ID required" });
  }
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(index, 1);
  res.status(200).json({ message: "Product deleted successfully", products });
};

//update a product by ID
const updateProductById = (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Product ID required" });
  }
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  //Update only the provided fields
  if (name) product.name = name;
  if (price) product.price = price;
  if (quantity) product.quantity = quantity;
  res.status(200).json({ message: "Product updated successfully", product });
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
