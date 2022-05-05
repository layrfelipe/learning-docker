const express = require("express");
const sequelize = require("./config/db");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(express.json());

sequelize.sync().then(() => console.log("Database connected successfully"));

// Entender melhor isso aqui depois
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use("/products", productRoutes)

app.listen(3000, () => {
  console.log("Server started on port 3000");
});