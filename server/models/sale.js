const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
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

    priceAtSale: {
      type: Number,
      required: true,
    },

    stockBeforeSale: {
      type: Number,
      required: true,
    },

    stockAfterSale: {
      type: Number,
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Sale", saleSchema);
