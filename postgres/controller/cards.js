// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('app', 'postgres', '123', {
//   dialect: 'postgres',
//   port: 5432,
// });

// const Cards = sequelize.define('Cards', {
//   title: Sequelize.STRING,
//   description: Sequelize.STRING,
//   count: Sequelize.INTEGER,
//   price: Sequelize.DOUBLE
// });
const models = require('../models');
// console.log(models);
module.exports = {
  'GET /cards': function (req, res)  {
    models.Cards.findAll().then(Cards => {
      res.send(Cards);
    });
  },

  'POST /cards': (req, res) => {
    const newCard = req.body;
    return Cards.create(newCard).then(() => {
      res.end()
    });
  },

  'DELETE /cards/:id': (req, res) => {
    Cards.destroy({
      where: {
        id: req.params.id
      }
    }).then(Cards => {
      res.end('204');
    });
  },
};

models.sequelize
  .sync({
    force: false
  })
  .then(function(err) {
    console.log('It worked!');
  }, function(err) {
    console.log('An error occurred while creating the table:', err);
  });
