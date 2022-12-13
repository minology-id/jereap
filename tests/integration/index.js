const { describe } = require('mocha');

const login = require('./login.test');
const user = require('./user.test');

module.exports = function () {
  describe('⇌  Integration', function () {
    describe('Login', login);
    describe('User :', user);
  });
};
