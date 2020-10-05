const users = require('../fixtures/users.json');

const findUserByCredentials = ({ username, password }) => {
  return users.find(u => u.username === username && u.password === password);
};

exports.byCredentials = findUserByCredentials;

let findUserByToken = ({ userId }) => users.find(user => user.id === userId);

exports.byToken = findUserByToken;
