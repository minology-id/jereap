const passport = require('passport');
const jwt = require('jsonwebtoken');
const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  COOKIE_OPTIONS: {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: dev,
    signed: true,
    maxAge: eval(process.env.RT_SESSION_EXPIRY) * 1000,
    sameSite: 'none',
  },
  getToken: (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: eval(process.env.JWT_SESSION_EXPIRY),
    });
  },
  getRefreshToken: (user) => {
    const refreshToken = jwt.sign(user, process.env.RT_SECRET, {
      expiresIn: eval(process.env.RT_SESSION_EXPIRY),
    });
    return refreshToken;
  },
  verifyUser: passport.authenticate('jwt', { session: false }),
};
