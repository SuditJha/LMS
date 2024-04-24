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

// Profile route
router.get('/profile', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  res.render("profile", { user })
})

// Dashboard Route
router.get('/dashboard', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  console.log(user)
  res.render('dashboard', { user })
})

router.get('/members', isLoggedIn, function (req, res) {
  res.send("Members Management")
})

router.get('/books', isLoggedIn, function (req, res) {
  res.send("Books Management")
})


// POST


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
        res.redirect('/dashboard')
      })
    })
})

// Login Route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
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
