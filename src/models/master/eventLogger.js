const { DataTypes } = require('sequelize');

const db = require('../../utils/db');

module.exports = db.define(
  'master_event',
  {
    eventId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    eventLevel: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    eventLog: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  },
  {
    modelName: 'EventLogger',
  }
);
