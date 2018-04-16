const gatekeeperMiddleware = {};

gatekeeperMiddleware.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

gatekeeperMiddleware.isSelf = (req, res, next) => {
  if (req.user.id === Number(req.params.userId)) {
    next();
  } else {
    res.sendStatus(403);
  }
}

gatekeeperMiddleware.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
}

gatekeeperMiddleware.isAdminOrSelf = (req, res, next) => {
  if (req.user.isAdmin || req.user.id === Number(req.params.userId)) {
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = gatekeeperMiddleware;