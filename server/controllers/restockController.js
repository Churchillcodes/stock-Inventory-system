const Restock = require("../models/restock");

//get all restocks
const getAllRestocks = async (req, res) => {
  try {
    const restocks = await Restock.find();
    res.status(200).json(restocks);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//get restock by id
const getRestockById = async (req, res) => {
  try {
    const { id } = req.params;
    const restock = await Restock.findById(id);
    if (!restock) {
      return res.status(404).json({ message: "Restock not found" });
    }
    res.status(200).json(restock);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    return res.status(500).json({ message: err.message });
  }
};

//get restock history by product
const getRestocksByProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const restocks = await Restock.find({ productId: id });
    if (!restocks.length) {
      return res
        .status(404)
        .json({ message: "No restocks found for this product" });
    }
    res.status(200).json(restocks);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllRestocks, getRestockById, getRestocksByProduct };
