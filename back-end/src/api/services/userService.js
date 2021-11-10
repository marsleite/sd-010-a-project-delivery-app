const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');
const AppError = require('../utils/AppError');
const dotenv = require('dotenv');

dotenv.config();
const { JWT_SECRET } = process.env;

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError(400, 'Invalid data');
  }

  const user = await User.findOne({ where: { email } });

  const passwordMd5 = md5(password);

  if (!user || user.dataValues.password !== passwordMd5) {
    throw new AppError(404, 'User not nound or incorrect password');
  }

  const token = jwt.sign({
    id: user.dataValues.id,
    email: user.dataValues.email,
  }, JWT_SECRET);

  return token;
};

module.exports = {
  login,
};