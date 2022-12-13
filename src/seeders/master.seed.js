module.exports = {
  role: [
    { roleId: 1, roleName: 'administrator' },
    { roleId: 2, roleName: 'staff' },
    { roleId: 3, roleName: 'operator' },
  ],
  status: [
    { statusId: 1, statusName: 'active' },
    { statusId: 2, statusName: 'disable' },
  ],
  user: [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '$2a$12$BhSQBXNB4PZZMUHlmtU97ufq8/hhN/MF03jggQAcC1FuAq0/BngXi',
      profilePic: 'default.webp',
      roleId: 1,
      status: 1,
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: '$2a$12$BhSQBXNB4PZZMUHlmtU97ufq8/hhN/MF03jggQAcC1FuAq0/BngXi',
      profilePic: 'default.webp',
      roleId: 1,
      status: 0,
    },
    {
      firstName: 'Karen',
      lastName: 'Doe',
      email: 'karen.doe@example.com',
      password: '$2a$12$BhSQBXNB4PZZMUHlmtU97ufq8/hhN/MF03jggQAcC1FuAq0/BngXi',
      profilePic: 'default.webp',
      roleId: 2,
      status: 1,
    },
    {
      firstName: 'Low',
      lastName: 'Doe',
      email: 'low.doe@example.com',
      password: '$2a$12$BhSQBXNB4PZZMUHlmtU97ufq8/hhN/MF03jggQAcC1FuAq0/BngXi',
      profilePic: 'default.webp',
      roleId: 3,
      status: 1,
    },
  ],
};
