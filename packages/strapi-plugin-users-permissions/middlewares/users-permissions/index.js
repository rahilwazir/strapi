'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const _ = require('lodash');
const passport = require('koa-passport');

module.exports = strapi => {
  return {
    beforeInitialize: function() {
      strapi.config.middleware.load.before.unshift('users-permissions');
      strapi.app.use(passport.initialize())
      strapi.app.use(passport.session())
    },

    initialize: function(cb) {
      _.forEach(strapi.admin.config.routes, value => {
        if (_.get(value.config, 'policies')) {
          value.config.policies.unshift('plugins.users-permissions.permissions');
        }
      });

      _.forEach(strapi.config.routes, value => {
        if (_.get(value.config, 'policies')) {
          value.config.policies.unshift('plugins.users-permissions.permissions');
        }
      });

      if (strapi.plugins) {
        _.forEach(strapi.plugins, (plugin, name) => {
          _.forEach(plugin.config.routes, value => {
            if (_.get(value.config, 'policies')) {
              value.config.policies.unshift('plugins.users-permissions.permissions');
            }
          });
        });
      }

      cb();
    }
  };
};
