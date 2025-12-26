module.exports = function role(allowedRoles = []) {
  return function (req, res, next) {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Access denied" });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: "Role check failed" });
    }
  };
};
