require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const massive = require('massive');
const authCtrl = require('./controllers/authController');
const imgCtrl = require('./controllers/imgController');
const prfCtrl = require('./controllers/profileController');
const auth = require('./middleware/authMiddleware');

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }));

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log(`db connected`);
}).catch(err => console.log(err));

//authentication 
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

//user rest api
app.get('/api/users', auth.usersOnly, prfCtrl.getUsers);//to get all user, and user friend information for timeline immedietely after login
app.post('/api/img/user', auth.usersOnly, imgCtrl.addUserImg); //to post new user image
app.put('/image/:post_id/:user_id', auth.usersOnly, imgCtrl.edit); //to edit user images
app.delete('/api/img/user/:post_id', auth.usersOnly, imgCtrl.delete); //to delete user image
//user profile rest api
app.put('/image/:user_id', auth.usersOnly, prfCtrl.update); //to update profile picture
app.put('/api/users/requests/:user_id', auth.usersOnly, prfCtrl.updateRequests); //update pending friend requests
//Server
app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`));
