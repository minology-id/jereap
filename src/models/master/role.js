const { DataTypes } = require('sequelize');

const db = require('../../utils/db');

module.exports = db.define(
  'master_role',
  {
    roleId: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    modelName: 'Role',
  }
);
