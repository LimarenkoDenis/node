const Acl = require('acl');
const acl = new Acl(new Acl.memoryBackend());
const role = require('./../config/permissions.js');

acl.allow(role);

module.exports = (resources, permissions) => {
  return (req, res, next) => {
    acl.areAnyRolesAllowed(req.role, resources, permissions, (err, allowed) => {
      if (allowed) {
        next();
      } else {
        console.log(req.role, resources, permissions);
        return res.status(403).send({
          success: false,
          message: 'No token provided.'
        });
      }
    });
  };
};
