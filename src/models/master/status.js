const { DataTypes } = require('sequelize');

const db = require('../../utils/db');

module.exports = db.define(
  'master_status',
  {
    statusId: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },
    statusName: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    modelName: 'Status',
  }
);
