const express = require('express');
const app = express();
const session = require('express-session');
const setupPassport = require('./passport/passport');
const bodyParser = require('body-parser');
const router = require('./router')(express);
const morgan = require('morgan');
const hb = require('express-handlebars');

// const ClothesService = require('./ClothesService');
// const ClothesRouter = require('./ClothesRouter');

require('dotenv').config();

const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

app.engine('handlebars', hb({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(morgan('combined'));

app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false}
}));


// const clothesService = new ClothesService(knex);

// app.use('/api/notes/', (new ClothesRouter(clothesService)).router());



app.use(express.static('public'))
// app.use(express.static('pages'))

app.use(bodyParser());

setupPassport(app);

app.use('/', router);

app.listen(8080, function () {
  console.log(`Application is listening to port 8080`)
});