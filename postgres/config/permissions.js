module.exports = [
  {
    roles: ['guest'],
    allows: [
      {
        resources: ['cards'],
        permissions: [
          'GET /cards'
        ]
      },
      {
        resources: ['authenticate', 'signUp'],
        permissions: [
          'POST /authenticate',
          'POST /signUp'
        ]
      },
      {
        resources: ['confirm'],
        permissions: [
          'POST /email/confirm'
        ]
      }
    ]
  },
  {
    roles: ['admin'],
    allows: [
      {
        resources: ['cards'],
        permissions: [
          'GET /cards',
          'GET /cards/counts',
          'POST /cards',
          'PUT /cards/:id',
          'DELETE /cards/:id'
        ]
      },
      {
        resources: ['users'],
        permissions: [
          'GET /users'
        ]
      }
    ]
  },
  {
    roles: ['user'],
    allows: [
      {
        resources: ['cards'],
        permissions: [
          'GET /cards',
          'POST /cards',
          'PUT /cards/:id',
          'DELETE /cards/:id'
        ]
      }
    ]
  }
];
