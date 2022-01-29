const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    email: {
      type: DataTypes.STRING,
      notNull: true,
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
    },
    role: {
      type: DataTypes.STRING,
      notNull: true,
    },
  });

  return User;
};

module.exports = User;