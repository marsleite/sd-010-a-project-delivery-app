const userService = require('../services/userService');
const { users } = require('../../database/models');

const HTTP_ERROR_STATUS = 400;
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_CONFLICT_STATUS = 409;

const login = async (req, res) => {
  try {
    const { user } = req;
    const response = await userService.login(user);
    return res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
};

const create = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const response = await userService.create({ 
      email, 
      requestPassword: password, 
      name, 
      requestRole: role,
    });
    return res.status(HTTP_CREATED_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
    });
  }
};

const createAdmin = async (req, res) => {
  const { email, password, name, role } = req.body;
  const userEmail = await users.findOne({ where: { email } });
  const userName = await users.findOne({ where: { name } });
  if (userEmail || userName) return res.status(HTTP_CONFLICT_STATUS).json({
    message: 'user alredy registered',
  });
  const response = await userService.createAdmin({ 
    email, 
    requestPassword: password, 
    name, 
    requestRole: role,
  });
  return res.status(HTTP_CREATED_STATUS).json(response);
};

const getAllUsers = async (_req, res) => {
  try {
    const response = await userService.getAllUsers();
    return res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userService.deleteUser(id);
    if (response === 0) {
      return res.status(HTTP_ERROR_STATUS).json({
        message: 'User not found',
      });
    }
    return res.status(HTTP_OK_STATUS).json({
      message: 'User deleted',
    });
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const { role } = req.params;
    const response = await userService.getUsers({ role });
    return res.status(HTTP_CREATED_STATUS).json(response);
  } catch (error) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: error,
  });
  }
};

module.exports = {
  login,
  create,
  getAllUsers,
  deleteUser,
  createAdmin,
  getUsers,
};