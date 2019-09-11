const express = require("express");
const app = express();
const session = require("express-session");
const setupPassport = require("./passport/passport");
const bodyParser = require("body-parser");
const router = require("./router")(express);
const morgan = require("morgan");
const hb = require("express-handlebars");

// All Routes
const ClothesService = require("./ClothesService");
const ClothesRouter = require("./ClothesRouter");

const ProductService = require("./ProductService");
const ProductRouter = require("./ProductRouter");

const ClothesTrendService = require("./ClothesTrendService");
const ClothesTrendRouter = require("./ClothesTrendRouter");

const ProductTypeService = require("./ProductTypeService");
const ProductTypeRouter = require("./ProductTypeRouter");

require("dotenv").config();

const knexConfig = require("./knexfile")["development"];
const knex = require("knex")(knexConfig);

app.engine("handlebars", hb({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

// app.use(morgan("combined"));

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

const clothesService = new ClothesService(knex);
const productService = new ProductService(knex);
const productTypeService = new ProductTypeService(knex);
const clothesTrendService = new ClothesTrendService(knex);

app.use(express.static("public"));

app.use(bodyParser());

setupPassport(app);

app.use("/", router);

app.use("/api/clothes", new ClothesRouter(clothesService).router());
app.use("/api/productInfo", new ProductRouter(productService).router());
app.use(
  "/api/productTypeInfo",
  new ProductTypeRouter(productTypeService).router()
);
app.use(
  "/api/clothes/trend",
  new ClothesTrendRouter(clothesTrendService).router()
);

app.listen(8080, function() {
  console.log(`Application is listening to port 8080`);
});

module.exports = app;
