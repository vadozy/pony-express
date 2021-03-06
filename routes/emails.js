const path = require('path');
const express = require('express');
const emails = require('../fixtures/emails');
const bodyParser = require('body-parser');
const multer = require('multer'); // for file uploads
const requireAuth = require('../lib/require-auth');
const generateId = require('../lib/generate-id');
const enforce = require('../lib/enforce');

const emailsRouter = express.Router();
const upload = multer({ dest: path.join(__dirname, '../uploads') });

const getEmailsRoute = (req, res) => {
  res.send(emails);
};

const updateEmailPolicy = (user, email) => user.id === email.from;
const deleteEmailPolicy = (user, email) => user.id === email.to;

const createEmailRoute = async (req, res) => {
  const attachments = (req.files || []).map(file => file.filename);
  const body = req.body;
  const newEmail = { ...body, id: generateId(), attachments };
  emails.push(newEmail);
  res.status(201);
  res.send(newEmail);
};

const updateEmailRoute = (req, res) => {
  const body = req.body;
  const email = emails.find(email => email.id === req.params.id);
  req.authorize(email);
  Object.assign(email, body);
  res.status(200);
  res.send(email);
};

const deleteEmailRoute = (req, res) => {
  const index = emails.findIndex(email => email.id === req.params.id);
  req.authorize(emails[index]);
  emails.splice(index, 1);
  res.sendStatus(204);
};

emailsRouter.use(requireAuth);

emailsRouter.get('/', getEmailsRoute);
emailsRouter.post(
  '/',
  bodyParser.json(),
  upload.array('attachments'),
  createEmailRoute
);
emailsRouter.patch(
  '/:id',
  enforce(updateEmailPolicy),
  bodyParser.json(),
  updateEmailRoute
);
emailsRouter.delete('/:id', enforce(deleteEmailPolicy), deleteEmailRoute);

module.exports = emailsRouter;
