const glob = require('glob');
const path = require('path');
const acl = require('./acl.js');

module.exports = {
  init: (app) => {
    glob('controller/*.js', function (er, files) {
      files.map(file => {
        const controller = require(path.join('..', file));
        for (action in controller) {
          const route = action.match(/(GET|POST|PUT|PATCH|DELETE)\s(.*)?/i);
          if (route) {
            const method = route[1].toLowerCase();
            const address = route[2];
            app[method](
              address,
              acl(controller.resources, action),
              controller[action]
            );
          }
        }
      });
    });
  }
};
