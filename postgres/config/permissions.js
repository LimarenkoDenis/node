module.exports = [
  {
    roles: ['guest'],
    allows: [
      {
        resources: 'cards',
        permissions: 'get'
      },
      {
        resources: ['authenticate', 'signUp'],
        permissions: ['post']
      }
    ]
  },
  {
    roles: ['admin'],
    allows: [
      {
        resources: 'cards',
        permissions: ['get', 'post', 'put', 'delete']
      },
      {
        resources: ['users'],
        permissions: ['get']
      }
    ]
  }
];
