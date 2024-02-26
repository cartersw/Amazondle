const express = require('express')

const router = express.Router()

//GET all
router.get('/', (req, res) => {
    res.json({mssg: 'GET all users'})
})
//GET single
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET single user'})
})
//POST new user
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new user'})
})
//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a new user'})
})
//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new user'})
})






module.exports = router

