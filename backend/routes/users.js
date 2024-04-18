const express = require('express')
const User = require('../models/userModel')
const router = express.Router()
const {
    createUser,
    getUsers,
} = require('../controllers/userController')
//GET all
router.get('/', getUsers)
//GET single
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET single user'})
})
//POST new user
router.post('/', createUser) 
//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a new user'})
})
//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new user'})
})






module.exports = router

