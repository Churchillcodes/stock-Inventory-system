const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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

    stockAtSale: {
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
