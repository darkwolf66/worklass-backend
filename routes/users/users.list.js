// app/routes/user.js
const UserDao = require('../api/user-dao.js');

module.exports = ((req, res, next) => {
    new UserDao(req.connection)
    .list()
    .then(products => res.json(products))
    .catch(next)
});