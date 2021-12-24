const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'user_id',
    },
    seller_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'seller_id',
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      notNull: true,
    },
    delivery_address: {
      type: DataTypes.STRING,
      notNull: true,
    },
    delivery_number: {
      type: DataTypes.STRING,
      notNull: true,
    },
    sale_date: {
      type: DataTypes.DATE,
      notNull: true,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      notNull: true,
    },
  }, {
    timestamps: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'seller',
    });
  };

  return Sale;
};

module.exports = Sale;