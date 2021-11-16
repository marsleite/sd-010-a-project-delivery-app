module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('sale', {
    totalPrice: DataTypes.DECIMAL(5, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {timestamps: false}, {tableName: 'sales'});
  sale.associate = (models) => {
    sale.hasMany(models.salesProduct, {
      foreignKey: 'sale_id',
      as: 'salesProduct',
    });
    sale.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'user_id',
    });
    sale.belongsTo(models.user, {
      as: 'seller',
      foreignKey: 'seller_id',
    });
  };
  return sale;
};