const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validateUpdateProduct = require("../middleware/validateUpdateProduct");

router.post("/", validateProduct, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", validateUpdateProduct, updateProductById);
module.exports = router;
