const router = require('express').Router();
const { registerUser, checkUser } = require('../controllers/userControllers')

router.route('/register').post(registerUser);
router.route('/login').post(checkUser)

module.exports = router;