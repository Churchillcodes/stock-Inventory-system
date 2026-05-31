const express = require("express");
const router = express.Router();

const {
  getAllRestocks,
  getRestockById,
  getRestocksByProduct,
} = require("../controllers/restockController");

router.get("/", getAllRestocks);
router.get("/product/:id", getRestocksByProduct);
router.get("/:id", getRestockById);

module.exports = router;
