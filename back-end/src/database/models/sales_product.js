const SalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    quantity: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
  }, 
    {
      tableName: 'sales_products',
      timestamps: false,
      underscored: true,
    },
  );

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.product, {
      through: 'sales_products',
      foreignKey: 'saleId',
      otherKey: 'productId',
      as: 'products',
    });
    models.product.belongsToMany(models.sale, {
      through: 'sales_products',
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'sales',
    });
  };

  return SalesProducts;
};

module.exports = SalesProducts;