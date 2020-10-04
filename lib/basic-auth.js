const basicAuth = findUser => (req, res, next) => {
  const header = req.headers.authorization || '';
  const [type, payload] = header.split(' ');

  if (type === 'Basic') {
    const credentials = Buffer.from(payload, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = findUser({ username, password });
    if (user) {
      req.user = user;
    } else {
      res.sendStatus(401);
      return;
    }
  }

  next();
};

module.exports = basicAuth;
