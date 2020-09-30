const express = require('express');
const users = require('../fixtures/users');

const usersRouter = express.Router();

const getUsersRoute = (req, res) => {
  res.send(users);
};

let getUserRoute = (req, res) => {
  console.log(req.params);
  let user = users.find(user => user.id === req.params.id);
  res.send(user);
};

usersRouter.get('/users', getUsersRoute);
usersRouter.get('/users/:id', getUserRoute);

module.exports = usersRouter;
