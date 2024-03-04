const express = require('express')
const User = require('../models/userModel')
const router = express.Router()
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
} = require('../controllers/userController')
//GET all
router.get('/', getUsers)

//GET single
router.get('/:id', getUser)

//POST new user
router.post('/', createUser) 
//DELETE a workout
router.delete('/:id', deleteUser)

//UPDATE a workout
router.patch('/:id', updateUser)





module.exports = router

