const md5 = require('md5');
const { User } = require('../../database/models');
const generateToken = require('./generateToken');

const err = (code, message) => ({ code, message });
const userNotFound = '"user" not found';

const create = async ({ name, email, password, role = 'customer' }) => {
  await User.create({ name, email, password: md5(password), role });

  const data = generateToken({ email, password });

  return data;
};

const findAll = async ({ role }) => {
  const where = (role === undefined || role === '') ? {} : { role };
  const data = await User.findAll({
      where,
    attributes: {
        exclude: ['password'],
    },
  });

  return data.filter((user) => user.role !== 'administrator');
};

const findOne = async ({ id }) => {
  const data = await User.findOne({ where: { id }, 
    attributes: {
      exclude: ['password'],
  } });

  if (!data) throw err('notFound', userNotFound);

  return data;
};

const update = async (user, { id }) => {
  const [data, wasCreated] = await User.upsert(user, { where: { id } });

  if (!wasCreated) throw err('notFound', userNotFound);

  return data;
};

const destroy = async ({ id }) => {
  const data = await User.destroy({ where: { id } });
  
  if (!data) throw err('notFound', userNotFound);
  
  const message = 'Usuário deletado com sucesso';

  return { message };
};

module.exports = { create, findAll, findOne, update, destroy };
