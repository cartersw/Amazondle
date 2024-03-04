const express = require('express')
const User = require('../models/userModel')

const {signupUser, loginUser} = require('../controllers/userController')
const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)


module.exports = router 