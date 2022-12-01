module.exports = {
  isDevelopment: process.env.NODE_ENV === 'development' ? true : false,
  ac: require('./accessControl'),
  dbLogger: require('./dbLogger'),
};
