const express = require('express');
const emails = require('../fixtures/emails');
const readBody = require('../lib/read-body');
const generateId = require('../lib/generate-id');

const emailsRouter = express.Router();

const getEmailsRoute = (req, res) => {
  res.send(emails);
};

const createEmailRoute = async (req, res) => {
  console.log('Creating email...');
  const body = await readBody(req);
  let newEmail = { ...JSON.parse(body), id: generateId() };
  emails.push(newEmail);
  res.status(201);
  res.send(newEmail);
};

const updateEmailRoute = async (req, res) => {
  let body = await readBody(req);
  let email = emails.find(email => email.id === req.params.id);
  Object.assign(email, JSON.parse(body));
  res.status(200);
  res.send(email);
};

let deleteEmailRoute = (req, res) => {
  let index = emails.findIndex(email => email.id === req.params.id);
  emails.splice(index, 1);
  res.sendStatus(204);
};

emailsRouter.get('/', getEmailsRoute);
emailsRouter.post('/', createEmailRoute);
emailsRouter.patch('/:id', updateEmailRoute);
emailsRouter.delete('/:id', deleteEmailRoute);

module.exports = emailsRouter;
