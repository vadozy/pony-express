const logger = require('./lib/logger');
const path = require('path');
const compress = require('compression');
const serveStatic = require('serve-static');

const express = require('express');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

const app = express();

app.use(logger);
app.use(compress(/* { threshold: 0 } */)); // default threshold is 1kb, make it 0
app.use(serveStatic(path.join(__dirname, 'public')));
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.listen(3000);
