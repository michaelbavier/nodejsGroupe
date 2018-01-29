const express = require("express");
const router = express.Router();
const mangoose = require("mongoose");
const passport = require ('passport');
const jwt = require('jssonwebtoken');

const config = require('../config/database');
config User = require ("../models/user");

export.user_singnup = (req, res , next) =>{
  let newUser = new user({
    name : req.body.name,
    email: req.body.email,
    username : req.body.password,
    country : req.body.country,
    language : req.body.language
  });

User.addUser(newuser, (err, user) =>{
  if (err) {
    res.json({
      success: false,
      msg: 'Failed to register user'
    });
  }else {
    res.json({
      success : true,
      msg: 'User registred'
      });
    }
  });
}

exports.user_login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getElementsByUsername(username, (err, user) =>{
    if (err) throw err;
    if (!user){
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }

User.comparePassowrd(password, user , password, (err, isMatch) =>{
  if (err) throw err,
  if (isMatch) {
  const token = jwt.sign({
    data: user
  }, config.secret, {
    expiresIn: 604800 // 1 week
  });

  res.json({
    success: true,
    token: `Bearer ${token}`,
    user: {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      country: user.country,
      language: user.language
    }
  });
} else {
  return res.json({
    success: false,
msg: 'Wrong password'
        });
      }
    });
  });
}
