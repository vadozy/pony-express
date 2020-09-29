const http = require('http');
const express = require('express');

const users = require('./fixtures/users');
const emails = require('./fixtures/emails');

const app = express();

app.use((req, res) => {
  let route = `${req.method} ${req.url}`;

  if (route === 'GET /users') {
    //res.end(JSON.stringify(users));
    res.send(users);
  } else if (route === 'GET /emails') {
    //res.end(JSON.stringify(emails));
    res.send(emails);
  } else {
    res.end('You asked for ' + route);
  }

  res.end(`You asked for ${route}`);
});

const server = http.createServer(app);
server.listen(3000);
