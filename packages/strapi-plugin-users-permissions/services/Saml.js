'use strict';

/**
 * Saml.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const passport = require('koa-passport');
const SamlStrategy = require('passport-saml').Strategy;

module.exports = {
  auth: (config) => {
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
  
    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
  
    passport.use(new SamlStrategy(config, (profile, done) => {
      console.log(profile);
      done(null, {
        username: profile.nameIDFormat,
        email: profile.Email
      });
    }));
  },
  strategy: () => {
    passport.authenticate('saml');   
  }
};
