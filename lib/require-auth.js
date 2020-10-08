const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic');
    res.sendStatus(401);
  }
};

module.exports = requireAuth;
