module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define('Cards', {
    title: {
      type: DataTypes.STRING,
      validate: {}
    },
    description: DataTypes.STRING,
    count: {
      type: DataTypes.INTEGER,
      validate: {
        min: -1
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      validation: {
        min: -1
      }
    }
  });

  return Cards;
};
