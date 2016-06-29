let cards = [{
  "id": 3,
  "title": "title1",
  "description": "descr1",
  "date": "21 May, 2015",
  "count": 22,
  "price": 14
}, {
  "id": 4,
  "title": "title2",
  "description": "desr2",
  "date": "21 May, 2015",
  "count": 5,
  "price": 2
}, {
  "id": 5,
  "title": "default title",
  "description": "default description",
  "count": 0,
  "price": 0,
  "date": "2016-06-16T14:34:20.209Z"
}];


module.exports = {
  'GET /cards': function(req, res) {
    res.send(cards)
  },

  'DELETE /cards/:id': function(req, res) {
    const id = +req.params.id;
    const index = cards.findIndex(item => item.id === id);
    cards.splice(index, 1);
    res.sendStatus(204);
  },

  'PUT /cards/:id': function(req, res) {
    const id = +req.params.id;
    const index = cards.findIndex(item => item.id === id);
    const card = req.body;
    card.date = new Date;
    cards.splice(index, 1, card);
    res.sendStatus(200);
  },

  'POST /cards': function(req, res) {
    const newCard = req.body;
    newCard.id = Math.max.apply(Math, cards.map(card => card.id)) + 1;
    cards.push(newCard);
    res.sendStatus(200);
  },
};









// "cards": [
//   {
//     "id": 0,
//     "title": "title1",
//     "description": "descr1",
//     "date": "21 May, 2015",
//     "count": 22,
//     "price": 14
//   },
//   {
//     "id": 1,
//     "title": "title2",
//     "description": "desr2",
//     "date": "21 May, 2015",
//     "count": 5,
//     "price": 2
//   }
// ]
