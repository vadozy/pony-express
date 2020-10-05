require('dotenv').config();
/* From now on, any variables listed in .env are available as environment variables. */
console.log(process.env.SIGNATURE);

const logger = require('./lib/logger');
const path = require('path');
const compress = require('compression');
const serveStatic = require('serve-static');
const basicAuth = require('./lib/basic-auth');
const tokenAuth = require('./lib/token-auth');
const findUser = require('./lib/find-user');

const express = require('express');

const tokensRouter = require('./routes/tokens');
const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

const app = express();

app.use(logger);
app.use(compress(/* { threshold: 0 } */)); // default threshold is 1kb, make it 0
app.use(serveStatic(path.join(__dirname, 'public')));
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));

app.use('/tokens', tokensRouter);
app.use(tokenAuth(findUser.byToken));
app.use(basicAuth(findUser.byCredentials));
app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.listen(3000);
