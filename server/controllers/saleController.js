const Sale = require("../models/sale");

//get all sales
const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//get sales by ID
const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findById(id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json(sale);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    return res.status(500).json({ message: err.message });
  }
};

//get all sales of a product by ID
const getSalesByProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await Sale.find({ productId: id });
    if (!sales.length) {
      return res
        .status(404)
        .json({ message: "No sales found for this product" });
    }
    res.status(200).json(sales);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllSales, getSaleById, getSalesByProduct };
