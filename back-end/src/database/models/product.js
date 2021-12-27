const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      notNull: true,
    },
    url_image: {
      type: DataTypes.STRING,
      notNull: true,
      field: 'url_image',
    },
  });

  return Product;
};

module.exports = Product;