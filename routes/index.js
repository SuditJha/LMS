const express = require('express');
const router = express.Router();
// Importing User Model
const userModel = require('./users')

// Setting up local Strategy
const passport = require('passport')
const localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', async function (req, res) {
  // console.log(req.flash('error'))
  res.render('login', { error: req.flash('error') })
})

router.get('/signup', function (req, res) {
  res.render('signup')
})

router.get('/profile', isLoggedIn, function (req, res) {
  res.render("profile")
})

// Register Route
router.post('/register', function (req, res) {
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
  })

  userModel.register(userData, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile')
      })
    })
})

// Login Route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true // Enabling Flash Messages on failure to login
}), function (req, res) { })

// Logout Route
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

// IsLoggedIN Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

module.exports = router;
