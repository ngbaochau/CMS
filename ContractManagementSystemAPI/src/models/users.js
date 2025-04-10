const bcrypt = require('bcryptjs');
let users = [
  {
    id: 1,
    username: 'admin@gmail.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'Admin'
  },
  {
    id: 2,
    username: 'pm@gmail.com',
    password: bcrypt.hashSync('pm123', 10),
    role: 'PM'
  },
  {
    id: 3,
    username: 'staff@gmail.com',
    password: bcrypt.hashSync('staff123', 10),
    role: 'Staff'
  }
];
module.exports = users;
