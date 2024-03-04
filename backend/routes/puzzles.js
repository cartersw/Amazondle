const express = require('express')
const User = require('../models/puzzleModel')
const router = express.Router()
const {
    createPuzzle,
    getPuzzles,
    getPuzzle,
    deletePuzzle,
    updatePuzzle
} = require('../controllers/puzzleController')
//GET all
router.get('/', getPuzzles)
//GET single

//GET single
router.get('/:id', getPuzzle)

//POST new user
router.post('/', createPuzzle) 
//DELETE a workout
router.delete('/:id', deletePuzzle)

//UPDATE a workout
router.patch('/:id', updatePuzzle)







module.exports = router