const { DataTypes } = require('sequelize');

const db = require('../../utils/db');

module.exports = db.define(
  'master_session',
  {
    sessionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    modelName: 'Session',
  }
);
