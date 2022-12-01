const Joi = require('joi');

const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

module.exports = {
  userId: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required()
    .label('User ID'),
  firstName: Joi.string().min(1).max(32).required().label('First name'),
  lastName: Joi.string().min(1).max(32).required().label('Last name'),
  email: Joi.string().email().required().label('Email address'),
  password: Joi.string()
    .pattern(passwordRegExp)
    .min(6)
    .max(16)
    .required()
    .label('Password'),
  oldPassword: Joi.string()
    .pattern(passwordRegExp)
    .min(6)
    .max(16)
    .required()
    .label('Current password'),
  newPassword: Joi.string()
    .pattern(passwordRegExp)
    .min(6)
    .max(16)
    .required()
    .label('New password'),
  profilePic: Joi.string().label('Profile Picture'),
  roleId: Joi.number().integer().min(1).max(9).required().label('Role ID'),
};
