const passport = require("passport");
const axios = require("axios");
const dateToHoroscope = require("./dateToHoroscope");
require("dotenv").config();

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const CartService = require("./service/CartService");
const cartService = new CartService(knex);

module.exports = express => {
  const router = express.Router();

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }

  router.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
  });

  router.get("/login", (req, res) => {
    res.sendFile(__dirname + "/pages/login.html");
  });

  router.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/secret",
      failureRedirect: "/error"
    })
  );

  router.get("/secret", isLoggedIn, (req, res) => {
    // console.log(req.user.id);
    // console.log(req.session.id)
    res.render("user", {
      name: req.user.name,
      horoscope: req.user.horoscope
    });
  });

  router.get("/secret_trend", isLoggedIn, (req, res) => {
    // console.log(req.user.id);
    // console.log(req.session.id)
    res.render("userTrend", {
      name: req.user.name,
      horoscope: req.user.horoscope
    });
  });
  router.get("/secret_casual", isLoggedIn, (req, res) => {
    // console.log(req.user.id);
    // console.log(req.session.id)
    res.render("userCasual", {
      name: req.user.name,
      horoscope: req.user.horoscope
    });
  });
  router.get("/secret_formal", isLoggedIn, (req, res) => {
    // console.log(req.user.id);
    // console.log(req.session.id)
    res.render("userFormal", {
      name: req.user.name,
      horoscope: req.user.horoscope
    });
  });
  router.get("/secret_out", isLoggedIn, (req, res) => {
    // console.log(req.user.id);
    // console.log(req.session.id)
    res.render("userOut", {
      name: req.user.name,
      horoscope: req.user.horoscope
    });
  });

  router.get("/cart", (req, res) => {
    cartService.list(req.user.name).then(response => {
      // add logic to handle if there is no data in the cart so that it doesnt throw an error - response[0.totalPrice] like a if else
      res.render("cart", {
        keyPublishable: process.env.PK,
        name: req.user.name,
        horoscope: req.user.horoscope,
        totalPrice: response[0].totalPrice
      });
      console.log(response[0].totalPrice);
    });
  });

  router.get("/error", (req, res) => {
    res.send("You are not logged in!");
  });

  router.get("/error", (req, res) => {
    res.send("You are not logged in!");
  });

  router.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/pages/signup.html");
  });

  router.post(
    "/signup",
    passport.authenticate("local-signup", {
      // After users sign up, redirect them to /horoscope where they can choose their d.o.b.
      successRedirect: "/horoscope",
      failureRedirect: "/error"
    })
  );

  router.get("/horoscope", (req, res) => {
    res.sendFile(__dirname + "/pages/horoscope.html");
  });

  /* Clicking on the button in the /horoscope page will pass the post request body (d.o.b.) to our custom middleware, which:
    1) Calculates the user's horoscope
    2) Stores the horoscope in a string into the UsersTable database */
  router.post("/horoscope", dateToHoroscope, (req, res) => {
    res.redirect("/");
  });
  router.get("/success", (req, res) => {
    res.render("success");
  });

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  return router;
};
