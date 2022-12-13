const cors = require('cors');
const morgan = require('morgan');
const xss = require('xss-clean');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

require('./strategy/jwtStrategy');
require('./strategy/localStrategy');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse urlencoded
app.use(express.urlencoded({ extended: true }));

// parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// use morgan req logger
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(',')
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// maintain session
app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Initialize passport
app.use(passport.initialize());

// using routes
app.use(routes);

// root path
app.get('/', (req, res) => {
  res.send('Api running');
});

module.exports = app;
