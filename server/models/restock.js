const mongoose = require("mongoose");
const restockSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      index: true,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },
    stockBeforeRestock: {
      type: Number,
      required: true,
    },
    stockAfterRestock: {
      type: Number,
      required: true,
    },
    quantityAdded: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Restock", restockSchema);
