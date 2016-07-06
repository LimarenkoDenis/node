const models = require('../models');
module.exports = {
  resources: 'cards',
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
      res.send('200', Cards);
    });
  },

  'POST /cards': (req, res) => {
    const newCard = req.body;
    return models.Cards.create(newCard).then(() => {
      res.end('200');
    });
  },

  'DELETE /cards/:id': (req, res) => {
    models.Cards.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.end('204');
    });
  },

  'PUT /cards/:id': (req, res) => {
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
    console.log('cards module worked!');
  }, (err) => {
    console.log('cards module:', err);
  });
