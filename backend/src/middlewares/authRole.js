

function authRole(allowedRoles) {
  return (req, res, next) => {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: 'Access denied: User not authenticated or role missing' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
    }

    next();
  };
}

module.exports = authRole;
