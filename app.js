const express = require("express");
const app = express();
const session = require("express-session");
const setupPassport = require("./passport/passport");
const bodyParser = require("body-parser");
const router = require("./router")(express);
const morgan = require("morgan");
const hb = require("express-handlebars");
const ClothesRouter = require("./ClothesRouter");
const ClothesService = require("./ClothesService");
require("dotenv").config();

const knexConfig = require("./knexfile")["development"];
const knex = require("knex")(knexConfig);

app.engine(
  "handlebars",
  hb({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use(morgan("combined"));
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);
app.use(express.static("public"));
// app.use(express.static('pages'))
app.use(bodyParser());
setupPassport(app);
app.use("/", router);

const Service = new ClothesService(knex);
const Router = new ClothesRouter(Service);
app.use("/api/clothes/", Router.router());

app.listen(8080, function() {
  console.log(`Application is listening to port 8080`);
});
