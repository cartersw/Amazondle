const express = require('express')
const User = require('../models/puzzleModel')
const router = express.Router()
const {
    createPuzzle,
    getPuzzles,
} = require('../controllers/puzzleController')
//GET all
router.get('/', getPuzzles)
//GET single
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET single user'})
})
//POST new user
router.post('/', createPuzzle) 
//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a new user'})
})
//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new user'})
})






module.exports = router