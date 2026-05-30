require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const app = express();
const logger = require("./middleware/logger");
const PORT = process.env.PORT || 3500;

//connect to mongodb
connectDB();

app.use(logger);
app.use(express.json());

//routes
app.use("/", require("./routes/root"));
app.use("/products", require("./routes/productRoutes"));
app.use("/sales", require("./routes/saleRoutes"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
