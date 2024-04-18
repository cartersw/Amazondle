const express = require('express')
const User = require('../models/attemptModel')
const router = express.Router()
const {
    createAttempt,
    getAttempts,
} = require('../controllers/attemptController')
//GET all
router.get('/', getAttempts)
//GET single
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET single user'})
})
//POST new user
router.post('/', createAttempt) 
//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a new user'})
})
//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new user'})
})






module.exports = router