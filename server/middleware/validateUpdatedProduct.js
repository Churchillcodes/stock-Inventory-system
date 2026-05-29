const validateUpdatedProduct = (req, res, next) => {
  const { name, price, quantity } = req.body;

  // check if at least one field is provided
  if (name === undefined && price === undefined && quantity === undefined) {
    return res.status(400).json({
      message: "At least one field is required for update",
    });
  }

  // validate name
  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({
      message: "Name must be a string",
    });
  }

  // validate price
  if (price !== undefined && typeof price !== "number") {
    return res.status(400).json({
      message: "Price must be a number",
    });
  }

  // validate quantity
  if (quantity !== undefined && typeof quantity !== "number") {
    return res.status(400).json({
      message: "Quantity must be a number",
    });
  }

  // business rules
  if (price !== undefined && price < 0) {
    return res.status(400).json({
      message: "Price cannot be negative",
    });
  }

  if (quantity !== undefined && quantity < 0) {
    return res.status(400).json({
      message: "Quantity cannot be negative",
    });
  }

  next();
};

module.exports = validateUpdatedProduct;
