const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const UserController = require("../controllers/user");

router.post('/register', UserController.user_signup);

router.post('/authenticate', UserController.user_login);

router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.json({
    user: req.user
  });
});

module.exports = router;
