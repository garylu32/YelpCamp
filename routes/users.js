const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.get('/register', users.renderRegister);

router.post('/register', catchAsync(users.register));

router.get('/login', (req, res) => {
    res.render('users/login');
})

// 
// storeReturnTo middleware is used to save the returnTo value from session to res.locals
router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;