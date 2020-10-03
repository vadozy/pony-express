const readBody = require('./read-body');

const jsonBodyParser = async (req, res, next) => {
  const bodyJson = await readBody(req);
  req.body = JSON.parse(bodyJson);
  next();
};

module.exports = jsonBodyParser;
