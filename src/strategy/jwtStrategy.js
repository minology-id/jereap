const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const { user, role, status } = require('../models/master');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // Check against the DB only if necessary.
    // This can be avoided if you don't want to fetch user details in each request.
    try {
      const currentUser = await user.findOne({
        where: {
          userId: jwt_payload.userId,
        },
      });

      if (!currentUser) return done(null, false);

      const { userId, firstName, lastName, roleId, email, statusId } =
        currentUser;
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
      return done(error, false);
    }
  })
);
