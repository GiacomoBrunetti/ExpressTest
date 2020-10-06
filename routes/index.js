const router = require('express').Router();

const { login } = require("./auth/login");


router.route('/login').post(login);


module.exports = router;