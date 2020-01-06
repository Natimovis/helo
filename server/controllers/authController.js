const bcrypt = require('bcryptjs');

module.exports = {
    
  register: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get('db');
    const result = await db.get_user([username]);
    const existingUser = result[0];
    if (existingUser) {
      return res.status(409).send('Username taken');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredUser = await db.register_user([ username, hash]);
    const user = registeredUser[0];
    req.session.user = { 
      username: user.username,
      id: user.user_id,
      password: user.user_password };
    console.log('authController.JS-18-register-req.session',req.session)
    return res.status(201).send(req.session.user);
  },

  login: async (req, res) => {
      const { username, password } = req.body;
      console.log('authControllerjs24-req.body', req.body)
    const foundUser = await req.app.get('db').get_user([username]);
    const user = foundUser[0];
    if (!user) {
      return res.status(401).send('User  not found. Please register as a new user before logging in.');
    }
    const isAuthenticated = bcrypt.compareSync(password, user.user_password);
    if (!isAuthenticated) {
      return res.status(403).send('Incorrect password');
    }
    req.session.user = { 
    id: user.user_id,
    username: user.username,
    password: user.user_password,
    profilePic:user.profilepic,
    requests:user.requests,
    friends:user.friends };
    console.log('authControllerjs.34-login-req.session.user',req.session.user)
    return res.send(req.session.user);
  },

  logout: (req, res) => {
    req.session.destroy();
    console.log('logged out')
    return res.sendStatus(200);
  }
};