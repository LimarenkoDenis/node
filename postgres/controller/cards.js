const models = require('../models');
module.exports = {
  'GET /cards': (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    if (!limit) {
      limit = 3;
    }
    models.Cards.findAll({
      offset: offset,
      limit: limit
    }).then(Cards => {
      res.send(Cards);
    });
  },

  'POST /cards': (req, res) => {
    const newCard = req.body;
    return models.Cards.create(newCard).then(() => {
      res.end();
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
    console.log('It worked!');
  }, (err) => {
    console.log('An error occurred while creating the table:', err);
  });
