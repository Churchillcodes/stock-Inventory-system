const express = require("express");
const router = express.Router();

const {
  getTotalUnitsSold,
  getTotalRevenue,
  getProductSalesAnalytics,
  getTopSellingProducts,
} = require("../controllers/analyticsController");

router.get("/units-sold", getTotalUnitsSold);
router.get("/total-revenue", getTotalRevenue);
router.get("/top-products", getTopSellingProducts);
router.get("/units-per-product", getProductSalesAnalytics);

module.exports = router;
