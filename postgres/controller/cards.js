const models = require('./../models');

module.exports = {
  resources: 'cards',

  'GET /cards/counts': (req, res) => {
    res.json({ message: 'This should be allowed only for admin' });
  },

  'GET /cards': (req, res) => {
    const defaultParams = {
      limit: 4,
      offset: 0,
      order: [
        ['updatedAt', 'DESC']
      ]
    };
    const settings = Object.assign(defaultParams, req.query);
    models.Cards.findAll(settings)
    .then(Cards => {
      res.status('200').send(Cards);
    }).catch((e) => {
      console.log(JSON.stringify(e));
    });
  },

  'POST /cards': (req, res) => {
    const newCard = req.body;
    return models.Cards.create(newCard)
    .then(() => {
      res.end('200');
    }).catch((e) => {
      console.log(JSON.stringify(e));
    });
  },

  'DELETE /cards/:id': (req, res) => {
    models.Cards.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.end('204');
    }).catch((e) => {
      console.log(JSON.stringify(e));
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
    }).catch((e) => {
      console.log(JSON.stringify(e));
    });
  }
};
