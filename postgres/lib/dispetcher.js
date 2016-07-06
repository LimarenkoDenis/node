const glob = require('glob');
const path = require('path');
const acl = require('./acl.js');

module.exports = {
  init: (app) => {
    glob('controller/*.js', (er, files) => {
      files.map(file => {
        const controller = require(path.join('..', file));
        for (action in controller) {
          const route = action.match(/(GET|POST|PUT|PATCH|DELETE)\s(.*)?/i);
          if (route) {
            app[route[1].toLowerCase()](route[2],
              acl(controller.resources, route[1].toLowerCase()),
              controller[action]);
          }
        }
      });
    });
  }
};
