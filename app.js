const express = require("express");
const app = express();
const session = require("express-session");
const setupPassport = require("./passport/passport");
const bodyParser = require("body-parser");
const router = require("./router")(express);
const morgan = require("morgan");
const hb = require("express-handlebars");

const ClothesService = require("./service/ClothesService");
const ClothesRouter = require("./router/ClothesRouter");

const CartService = require("./service/CartService");
const CartRouter = require("./router/CartRouter");

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const ProductService = require("./service/ProductService");
const ProductRouter = require("./router/ProductRouter");

const ClothesTrendService = require("./service/ClothesTrendService");
const ClothesTrendRouter = require("./router/ClothesTrendRouter");

const ProductTypeService = require("./service/ProductTypeService");
const ProductTypeRouter = require("./router/ProductTypeRouter");

const SuggestionService = require("./service/SuggestionService");
const SuggestionRouter = require("./router/SuggestionRouter");

// const stripe = require("stripe")("pk_test_fcZ614e9OlUYxHihml2qDRNW00HwgZPpJU");


require("dotenv").config();

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

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use(express.static("public"));

setupPassport(app);

const clothesService = new ClothesService(knex);
const cartService = new CartService(knex);
const productService = new ProductService(knex);
const productTypeService = new ProductTypeService(knex);
const clothesTrendService = new ClothesTrendService(knex);
const suggestionService = new SuggestionService(knex);

app.use("/", router);
app.use("/api/cart/", new CartRouter(cartService).router());
app.use("/api/clothes", new ClothesRouter(clothesService).router());
app.use("/api/productInfo", new ProductRouter(productService).router());
app.use('/api/suggestion',(new SuggestionRouter(suggestionService).router()));
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
