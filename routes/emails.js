const express = require('express');
const emails = require('../fixtures/emails');
const generateId = require('../lib/generate-id');
const jsonBodyParser = require('../lib/json-body-parser');

const emailsRouter = express.Router();

const getEmailsRoute = (req, res) => {
  res.send(emails);
};

const createEmailRoute = async (req, res) => {
  console.log('Creating email...');
  const body = req.body;
  let newEmail = { ...body, id: generateId() };
  emails.push(newEmail);
  res.status(201);
  res.send(newEmail);
};

const updateEmailRoute = async (req, res) => {
  const body = req.body;
  const email = emails.find(email => email.id === req.params.id);
  Object.assign(email, body);
  res.status(200);
  res.send(email);
};

let deleteEmailRoute = (req, res) => {
  const index = emails.findIndex(email => email.id === req.params.id);
  emails.splice(index, 1);
  res.sendStatus(204);
};

emailsRouter.get('/', getEmailsRoute);
emailsRouter.post('/', jsonBodyParser, createEmailRoute);
emailsRouter.patch('/:id', jsonBodyParser, updateEmailRoute);
emailsRouter.delete('/:id', deleteEmailRoute);

module.exports = emailsRouter;
