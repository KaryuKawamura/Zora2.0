//passport.js

require("dotenv").config();

const passport = require("passport/lib");
const LocalStrategy = require("passport-local/lib").Strategy;
const bcrypt = require("./bcrypt");
const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 5431
  }
});

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    "local-login",
    new LocalStrategy(async (name, password, done) => {
      try {
        let users = await knex("userstable").where({
          name: name
        });
        if (users.length == 0) {
          return done(null, false, {
            message: "Incorrect credentials."
          });
        }
        let user = users[0];
        let result = await bcrypt.checkPassword(password, user.password);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Incorrect credentials."
          });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    "local-signup",
    new LocalStrategy(async (name, password, done) => {
      try {
        let users = await knex("userstable").where({
          name: name
        });
        console.log(users.length);
        if (users.length > 0) {
          return done(null, false, {
            message: "Name already taken"
          });
        }
        let hash = await bcrypt.hashPassword(password);
        const newUser = {
          name: name,
          password: hash
        };
        let userId = await knex("userstable")
          .insert(newUser)
          .returning("id");
        newUser.id = userId[0];
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.name);
  });

  passport.deserializeUser(async (name, done) => {
    let users = await knex("userstable").where({
      name: name
    });
    if (users.length == 0) {
      return done(new Error(`Wrong user name ${name}`));
    }
    let user = users[0];
    return done(null, user);
  });
};
