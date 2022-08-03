const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')



const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/users/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/users/login');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token,process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        req.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id).select('-password');
        req.user = user;
        next();
      }
    });
  } else {
    // res.locals.user = null;
    // next();
    res.redirect('/users/login');
  }
};


module.exports = { requireAuth, checkUser };

