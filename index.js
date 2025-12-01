const express = require('express')
const cors = require('cors')
const formidable = require('express-formidable')
const db = require('./dbConn')
const adminModal = require('./modals/adminModal')
const session = require('express-session')
const { IsUserValid, hasRole } = require('./middlewares/auth')
const app = express()
const HOST = 'localhost'
const PORT = 8000
app.use(cors())

app.use(formidable())
app.set("view engine", "ejs")
app.use(express.static('./public'))

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60, secure: false }
}))

// Import Routes of User
const userRoutes = require('./routes/userRoutes')
// localhost:8000/user
app.use('/user', IsUserValid, hasRole('user'), userRoutes)

// Import Routes of Admin
const adminRoutes = require('./routes/adminRoutes')
// localhost:8000/admin
// app.use('/admin', IsUserValid, hasRole('admin'), adminRoutes)
app.use('/admin', adminRoutes)

app.get('/login', (req, res) => {
  res.render('login', { msg: null })
})

app.post('/login', async (req, res) => {

  const user = await adminModal.findOne({ emailId: req.fields.mailId })
  if (user) {
    if (user.password === req.fields.pwd) {

      req.session.loginData = { uid: user._id, name: user.userName, role: user.hasRole }

      res.redirect(user.hasRole === 'admin' ? '/admin' : '/user')
    }
    else {
      res.render('login', { msg: 'Password Incorrect...' })
    }
  }
  else {
    res.render('login', { msg: 'Invalid User ID' })
  }
})

app.get('/logout', (req, res) => {

  req.session.destroy((err) => {
    res.clearCookie('connect.sid')
    res.redirect('/login')
  })
})




// localhost:8000
app.get('/', (req, res) => {
  // res.send("My First Express App......")
  let name = 'Sachin'
  let age = 45
  let msg = '<h2 align="center"> Hello World </h2> '
  res.render('defaultPage', { name, age, msg })
})

// localhost:8000/home
app.get('/home', (req, res) => {
  res.send("Welcome to Home Page")
})

app.post('/formData', (req, res) => {
  res.send("Form Data Submitted....")
})







app.listen(PORT, HOST, (err) => {
  if (err)
    console.log(err);
  else
    console.log(`Server Running at http://${HOST}:${PORT}`);
})


