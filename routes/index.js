const express = require('express');
const router = express.Router();
// Importing User Model
const userModel = require('./users')
const booksModel = require('./books.model')
const customerModel = require('./customer.model')
// const generateHtmlString = require('./generateHtmlString')

// Setting up local Strategy
const passport = require('passport')
const localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/test', (req, res) => {
  res.render('test')
})

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

  const books = await booksModel.find({
    book: "book"
  })
  // console.log(books);
  // const htmlString = books.map((book, index) => {
  //   return `<tr>
  //           <th scope="row">${index + 1}</th>
  //           <td>${book.name}</td>
  //           <td>${book.author}</td>
  //           <td>${book.genre}</td>
  //           <td>${book._id}</td>
  //       </tr>`
  // }).join("")
  // console.log(htmlString)
  res.render('dashboard', { books })
})

router.get('/members', isLoggedIn, function (req, res) {
  res.send("Members Management")
})

router.get('/books', isLoggedIn, function (req, res) {
  res.render("books")
})

router.get('/customers', async function (req, res) {
  const customers = await customerModel.find({
    customer: "customer"
  }).populate("book")
  // console.log(customers)
  // res.send(customers)
  res.render("customers", { customers })
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


// AddBook
router.post("/addBook", async function (req, res, next) {
  const { name, author, genre } = req.body
  console.log(name, author, genre)
  const newBook = await booksModel.create({
    name,
    author,
    genre
  })
  // const htmlString = generateHtmlString()
  const books = await booksModel.find({
    book: "book"
  })
  // const htmlString = books.map((book, index) => {
  //   return `<tr>
  //           <th scope="row">${index + 1}</th>
  //           <td>${book.name}</td>
  //           <td>${book.author}</td>
  //           <td>${book.genre}</td>
  //           <td>${book._id}</td>
  //       </tr>`
  // }).join("")

  res.render("dashboard", { books })

})

// Delete Book
router.post("/deleteBook", async function (req, res, next) {
  const book = await booksModel.deleteOne({
    _id: req.body.id
  })
  const books = await booksModel.find({
    book: "book"
  })
  res.render("dashboard", { books })
})

// Issue Book
router.post("/issueBook", async function (req, res, next) {
  const book = await booksModel.updateOne({
    _id: req.body.id
  }, { issued: "YES" })

  const { name, address, phone, issueDate, dueDate, id } = req.body
  console.log(id);
  const newCustomer = await customerModel.create({
    name,
    address,
    phone,
    issueDate,
    dueDate,
    book: id
  })
  // console.log(book)
  const books = await booksModel.find({
    book: "book"
  })
  res.render("dashboard", { books })
})

router.post("/returnBook", async function (req, res, next) {
  const book = await booksModel.updateOne({
    _id: req.body.id
  }, { issued: "NO" })
  // console.log(book)
  const deletedCustomer = await customerModel.deleteOne({ book: req.body.id })
  console.log(deletedCustomer);
  const books = await booksModel.find({
    book: "book"
  })
  res.render("dashboard", { books })
})





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
