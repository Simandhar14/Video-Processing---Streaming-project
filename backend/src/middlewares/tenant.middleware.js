module.exports = (req, res, next) => {
  if (!req.user || !req.user.tenantId) {
    return res.status(401).json({ message: "Tenant not resolved" });
  }

  // ✅ THIS LINE IS CRITICAL
  req.tenantId = req.user.tenantId;

  next();
};
