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
    let role = req.role;
    console.log(role);
    acl.areAnyRolesAllowed(role, resources, permissions, (err, allowed) => {
      if (allowed) {
        console.log(role, resources, permissions);
        next();
      } else {
        console.log(role, resources, permissions);
        return res.status(403).send({
          success: false,
          message: 'No token provided.'
        });
      }
    });
  };
};
