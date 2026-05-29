const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  sellProduct,
  restockProduct,
} = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validateUpdatedProduct = require("../middleware/validateUpdatedProduct");

router.post("/", validateProduct, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", validateUpdatedProduct, updateProductById);
router.post("/:id/sell", sellProduct);
router.post("/:id/restock", restockProduct);
module.exports = router;
