const passport = require('passport');
const dateToHoroscope = require('./dateToHoroscope');


module.exports = (express) => {

  const router = express.Router();

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } 
    res.redirect('/login');
  }

  router.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
  });

  router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/pages/login.html');
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/secret',
    failureRedirect: '/error'
  }));

  router.get('/secret', isLoggedIn, (req, res) => {
    // console.log(req.user.id);
    // console.log(req.session.id)
    res.render('user', {
      name: req.user.name,
      horoscope: req.user.horoscope
    });
  });


  router.get('/error', (req, res) => {
    res.send('You are not logged in!');
  });

  router.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/signup.html');
  });

  router.post('/signup', passport.authenticate('local-signup', {
    // After users sign up, redirect them to /horoscope where they can choose their d.o.b.
    successRedirect: '/horoscope',
    failureRedirect: '/error'
  }));

  router.get('/horoscope', (req, res) => {
    res.sendFile(__dirname + '/pages/horoscope.html');
  });
  
  /* Clicking on the button in the /horoscope page will pass the post request body (d.o.b.) to our custom middleware, which:
    1) Calculates the user's horoscope
    2) Stores the horoscope in a string into the UsersTable database */
  router.post('/horoscope', dateToHoroscope, (req, res) => {
    res.redirect('/')
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  });

  return router;
};