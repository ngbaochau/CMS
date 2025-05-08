import Role from '../models/Roles.js';

export const roleMiddleware = (allowedRoles) => {
    return async (req, res, next) => {
      let role = await Role.findByPk(req.user.role);
      if (!req.user || !allowedRoles.includes(role.name)) {
        return res.status(403).json({ message: 'Access denied: insufficient role' });
      }
      next();
    };
  };
  