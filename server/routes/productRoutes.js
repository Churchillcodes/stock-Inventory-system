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
  getLowStockProducts,
} = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validateUpdatedProduct = require("../middleware/validateUpdatedProduct");

router.get("/", getAllProducts);
router.post("/", validateProduct, createProduct);

router.get("/low-stock", getLowStockProducts);

router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", validateUpdatedProduct, updateProductById);

router.post("/:id/sell", sellProduct);
router.post("/:id/restock", restockProduct);

module.exports = router;
