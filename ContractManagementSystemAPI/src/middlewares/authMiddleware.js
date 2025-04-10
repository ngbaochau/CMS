let jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
  let authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.split(' ')[1]; 
  if (!token) return res.sendStatus(401);  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);  
    req.user = user;
    next();
  });
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });  
    }
    next();
  };
}
module.exports = { authenticateToken, authorizeRoles };
