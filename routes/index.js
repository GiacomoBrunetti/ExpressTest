const router = require('express').Router();

const { login } = require("./auth/login");
const { signup } = require("./auth/signup");


router.route('/login').post(login);
router.route('/signup').post(signup);


module.exports = router;