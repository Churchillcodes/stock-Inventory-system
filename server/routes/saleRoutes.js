const express = require("express");
const router = express.Router();

const {
  getAllSales,
  getSaleById,
  getSalesByProduct,
} = require("../controllers/saleController");

router.get("/", getAllSales);
router.get("/product/:id", getSalesByProduct);
router.get("/:id", getSaleById);

module.exports = router;
