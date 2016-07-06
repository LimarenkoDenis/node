const Acl = require('acl');
const acl = new Acl(new Acl.memoryBackend());
const jwt = require('jsonwebtoken');
// const jwtV = require('./jwt.js');

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
    let role = 'guest';
    // const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // console.log(token);
    // if (token) {
    //   jwt.verify(token, 'ilovescotchyscotch', (err, decoded) => {
    //     if (err) {
    //       role = 'guest'
    //       return res.json({
    //         success: false,
    //         message: 'Failed to authenticate token.'
    //       });
    //     } else {
    //       role = 'admin';
    //       req.decoded = decoded;
    //       next();
    //     }
    //   });
    // } else {
    //   role = 'guest'
    // }

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
