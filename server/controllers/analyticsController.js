const Sale = require("../models/sale");

//get total units sold
const getTotalUnitsSold = async (req, res) => {
  try {
    const totalUnits = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalUnitsSold: {
            $sum: "$quantitySold",
          },
        },
      },
    ]);
    res.status(200).json({
      totalUnitsSold: totalUnits[0]?.totalUnitsSold || 0,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//get units sold per product
const getProductSalesAnalytics = async (req, res) => {
  try {
    const unitsPerProduct = await Sale.aggregate([
      {
        $group: {
          _id: "$productId",
          productName: { $first: "$productName" },
          totalQuantitySold: { $sum: "$quantitySold" },
          totalRevenue: {
            $sum: { $multiply: ["$priceAtSale", "$quantitySold"] },
          },
        },
      },
      {
        $sort: { totalQuantitySold: -1, totalRevenue: -1, productName: 1 },
      },
    ]);

    res.status(200).json(unitsPerProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get total revenue
const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Sale.aggregate([
      {
        $project: {
          revenue: {
            $multiply: ["$priceAtSale", "$quantitySold"],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$revenue",
          },
        },
      },
    ]);
    res.status(200).json({
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//get top-sellng products
const getTopSellingProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const result = await Sale.aggregate([
      {
        $group: {
          _id: "$productId",
          totalSold: { $sum: "$quantitySold" },
          totalRevenue: {
            $sum: { $multiply: ["$priceAtSale", "$quantitySold"] },
          },
        },
      },
      {
        $sort: {
          totalSold: -1,
          totalRevenue: -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          productId: "$_id",
          productName: "$product.name",
          totalSold: 1,
          totalRevenue: 1,
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTotalUnitsSold,
  getTotalRevenue,
  getProductSalesAnalytics,
  getTopSellingProducts,
};
