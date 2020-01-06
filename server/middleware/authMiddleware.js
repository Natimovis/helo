module.exports = {
    usersOnly: (req, res, next) => {
      console.log('authMiddlewarejs3 req.session.user', req.session.user, 'req.body:', req.body)
      if (!req.session.user) {
        return res.status(401).send('Please log in');
      }
      next();
    },
  
    adminsOnly: (req, res, next) => {
      if (!req.session.user.isAdmin) {
        return res.status(403).send('You are not an admin');
      }
      next();
    }
  };