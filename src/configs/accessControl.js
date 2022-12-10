const roleAcl = require('role-acl');

const ac = new roleAcl();

// Administrator access control list
ac.grant('administrator')
  .execute('read')
  .on('user')
  .execute('create')
  .on('user')
  .execute('update')
  .on('user')
  .execute('disable')
  .on('user')
  .execute('delete')
  .on('user')
  .execute('update')
  .on('password')
  .execute('switch')
  .on('status');

// Staff access control list
ac.grant('staff').execute('read').on('user').execute('update').on('password');

// Operator access control list
ac.grant('operator')
  .execute('read')
  .on('user')
  .execute('update')
  .on('password');

module.exports = ac;
