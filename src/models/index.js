const master = require('./master');

master.user.belongsTo(master.role, { foreignKey: 'roleId' });
master.user.belongsTo(master.status, { foreignKey: 'statusId' });

module.exports = {
  master: require('./master'),
};
