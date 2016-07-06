const Acl = require('acl');
const acl = new Acl(new Acl.memoryBackend());
const jwt = require('jsonwebtoken');

acl.allow([{
  roles: ['guest'],
  allows: [{
    resources: 'cards',
    permissions: 'get'
  }, {
    resources: ['authenticate'],
    permissions: ['post']
  }]
}, {
  roles: ['admin'],
  allows: [{
    resources: 'cards',
    permissions: ['get', 'post', 'put', 'delete']
  }, {
    resources: ['users'],
    permissions: ['get']
  }]
}]);

module.exports = (resources, permissions) => {
  return (req, res, next) => {
    acl.areAnyRolesAllowed(req.role, resources, permissions, (err, allowed) => {
      if (allowed) {
        next();
      } else {
        return res.status(403).send({
          success: false,
          message: 'No token provided.'
        });
      }
    });
  };
};
