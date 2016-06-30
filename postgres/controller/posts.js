const Sequelize = require('sequelize');
const sequelize = new Sequelize('app', 'postgres', '123', {
    dialect: 'postgres',
    port: 5432,
  });

const Cards = sequelize.define('Cards', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  count: Sequelize.INTEGER,
  price: Sequelize.DOUBLE
});

module.exports = {
  'GET /cards': (req, res) => {
    sequelize.sync().then(() => {
      Cards.findAll().then((Cards) => {
        console.log(Cards);
        res.send(Cards)
      });
    })
  },
}

sequelize
  .sync({ force: false })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
  });

// sequelize.sync().then(() => {
//   Cards.findById(2).then((Cards) => {
//     console.log(Cards.dataValues);
//   });
// });

// sequelize.sync().then(() => {
//   Cards.create({
//     title: 'demo1',
//     description: 'descr1',
//     count: 2,
//     price: 3
//   });
// });




// const pg = require('pg');
// const conString = 'postgres://postgres:123@localhost:5432/appdb';
// const client = new pg.Client(conString);
// client.connect();
//
// module.exports = {
//   'GET /cards': (req, res) => {
//     const query = client.query('SELECT * FROM cards');
//     query.on('row', (row, result) => {
//       result.addRow(row);
//     });
//     query.on('end', (result) => {
//       res.send(result.rows);
//     });
//   },
//
//   'DELETE /cards/:id': (req, res) => {
//     const id = req.params.id;
//     const query = client.query(`DELETE  FROM cards WHERE id = ${id}`);
//     query.on('end', (result) => {
//       res.send(result.rows);
//     });
//     // res.statusCode(204);
//   },
//
//   // 'PUT /cards/:id': (req, res) => {
//   //   const id = +req.params.id;
//   // },
//
//   'POST /cards': (req, res) => {
//     const newCard = req.body;
//     const arr = [];
//     for (key in newCard){
//       arr.push(newCard[key]);
//     };
//     const query = client.query(`
//       INSERT INTO cards(title, description, count, price)
//         VALUES ('${arr[0]}', '${arr[1]}', '${arr[2]}', '${arr[3]}');
//     `);
//     console.log(query);
//     query.on('end', (result) => {
//       res.send(result.rows);
//     });
//   }
// };
