const express = require('express');
const passport = require('passport');
const user = require('./../controllers/user');

const router = express.Router();

router.get('/currentuser', passport.authenticate('jwt', {session: false}), user.currentUser);

module.exports = router;