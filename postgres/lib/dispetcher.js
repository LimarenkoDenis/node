const glob = require('glob');
const path = require('path');

module.exports = {
  init: (app) => {
    glob('controller/*.js', (er, files) => {
      files.map(file => {
        const controller = require(path.join('..', file));
        for (action in controller) {
          const route = action.split(' ');
          app[route[0].toLowerCase()](route[1], controller[action]);
        }
      });
    });
  }
};
