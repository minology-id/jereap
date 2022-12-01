const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { user, role, status } = require('../models/master');

//Called during login/sign up.
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function (email, password, done) {
      try {
        const currentUser = await user.unscoped().findOne({
          where: { email },
          raw: true,
        });

        if (!currentUser) return done(null, false);

        const isPasswordMatch = await bcrypt.compare(
          password,
          currentUser.password
        );

        if (!isPasswordMatch) return done(null, false);

        const { userId, firstName, lastName, roleId, statusId } = currentUser;
        const currentRole = await role.findOne({ where: { roleId } });
        const currentStatus = await status.findOne({ where: { statusId } });

        return done(null, {
          userId,
          firstName,
          lastName,
          email,
          roleId,
          roleName: currentRole?.roleName,
          statusId,
          statusName: currentStatus?.statusName,
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//called while after logging in / signing up to set user details in req.user
passport.serializeUser(async function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      userId: user.userId,
    });
  });
});
