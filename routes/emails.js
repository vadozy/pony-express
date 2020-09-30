const express = require('express');
const emails = require('../fixtures/emails');

const emailsRouter = express.Router();

const getEmailsRoute = (req, res) => {
  res.send(emails);
};

emailsRouter.get('/emails', getEmailsRoute);

module.exports = emailsRouter;
