const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

//List Users
const listUsers = require('./users/users.list.js');
routes.get('/users', listUsers);
//Get User Informartion
const  = require('./users/');
routes.get('/users', users);

module.exports = routes;