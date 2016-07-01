module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define('Cards', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    count: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  });

  return Cards;
};
