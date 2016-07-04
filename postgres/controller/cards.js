const models = require('../models');
module.exports = {
  'GET /cards': (req, res) => {
    const defaultParams = {
      limit: 5,
      offset: 0,
      order: [
        ['updatedAt', 'DESC']
      ]
    };
    const settings = Object.assign(defaultParams, req.query);
    models.Cards.findAll(settings).then(Cards => {
      res.send(Cards);
    });
  },

  'POST /api/cards': (req, res) => {
    const newCard = req.body;
    return models.Cards.create(newCard).then(() => {
      res.end('200');
    });
  },

  'DELETE /api/cards/:id': (req, res) => {
    models.Cards.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.end('204');
    });
  },

  'PUT /api/cards/:id': (req, res) => {
    const updCard = req.body;
    models.Cards.update(updCard, {
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.end('200');
    });
  }
};

models.sequelize
  .sync({
    force: false
  })
  .then(() => {
    console.log('It worked!');
  }, (err) => {
    console.log('An error occurred while creating the table:', err);
  });
