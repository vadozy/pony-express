const logger = require('./lib/logger');

const express = require('express');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

const app = express();

app.use(logger);

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.listen(3000);
