const express = require('express');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

const app = express();
app.use(usersRouter);
app.use(emailsRouter);

app.listen(3000);
