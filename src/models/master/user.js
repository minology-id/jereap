const { DataTypes } = require('sequelize');

const db = require('../../utils/db');

module.exports = db.define(
  'master_user',
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: false,
    },
    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: 'email',
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'src/assets/default/profilePic.jpg',
    },
    roleId: {
      type: DataTypes.TINYINT,
      default: 1,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: false,
    },
    lastChangePassword: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdBy: DataTypes.UUID,
    updatedAt: {
      type: DataTypes.DATE,
    },
    updatedBy: DataTypes.UUID,
  },
  {
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
  }
);
