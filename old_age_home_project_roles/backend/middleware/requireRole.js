module.exports = function(allowedRoles){
  return function(req,res,next){
    const role = req.user?.role;
    if(!role) return res.status(401).json({ message:'No role info' });
    if(Array.isArray(allowedRoles)){
      if(!allowedRoles.includes(role)) return res.status(403).json({ message:'Forbidden: insufficient role' });
      return next();
    } else {
      if(role !== allowedRoles) return res.status(403).json({ message:'Forbidden: insufficient role' });
      return next();
    }
  }
}
