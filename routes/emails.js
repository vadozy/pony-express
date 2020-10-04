const path = require('path');
const express = require('express');
const emails = require('../fixtures/emails');
const generateId = require('../lib/generate-id');
const bodyParser = require('body-parser');
const multer = require('multer'); // for file uploads

const emailsRouter = express.Router();
const upload = multer({ dest: path.join(__dirname, '../uploads') });

const getEmailsRoute = (req, res) => {
  res.send(emails);
};

const createEmailRoute = async (req, res) => {
  const attachments = (req.files || []).map(file => file.filename);
  const body = req.body;
  const newEmail = { ...body, id: generateId(), attachments };
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
emailsRouter.post(
  '/',
  bodyParser.json(),
  upload.array('attachments'),
  createEmailRoute
);
emailsRouter.patch('/:id', bodyParser.json(), updateEmailRoute);
emailsRouter.delete('/:id', deleteEmailRoute);

module.exports = emailsRouter;
