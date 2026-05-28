const validateProduct = (req, res, next) => {
  const { name, price, quantity } = req.body;

  if (!name || price === undefined || quantity === undefined) {
    return res
      .status(400)
      .json({ message: "Name, price and quantity are required" });
  }

  if (
    typeof name !== "string" ||
    typeof price !== "number" ||
    typeof quantity !== "number"
  ) {
    return res.status(400).json({ message: "Invalid data types" });
  }

  if (price < 0 || quantity < 0) {
    return res
      .status(400)
      .json({ message: "Price and quantity cannot be negative" });
  }
  next();
};

module.exports = validateProduct;
