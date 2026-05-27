const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
app.use(express.json());

//routes
app.use("/", require("./routes/root"));
app.use("/products", require("./routes/productRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
