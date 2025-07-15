// this file stores the authorization part
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Local strategy for email/password login
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    
    if (user.isBanned) {
      return done(null, false, { message: 'Account is banned' });
    }
    
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// JWT strategy for protected routes
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};
passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    
    if (!user) return done(null, false);
    if (user.isBanned) return done(null, false, { message: 'Account is banned' });
    
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

module.exports = passport;
