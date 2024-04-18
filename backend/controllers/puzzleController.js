const Puzzle = require('../models/puzzleModel')

//GET all puzzles
const getPuzzles = async (req, res)  => {
    const users = await Puzzle.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}


//GET single puzzle



//create new puzzle
const createPuzzle = async (req, res)  => {
    const {puzzleName, description, solution, difficultyLevel} = req.body

    try {
        const puzzle = await Puzzle.create({puzzleName, description, solution, difficultyLevel})
        res.status(200).json(puzzle)
    } catch (error){
        res.status(400).json({error: error.message})
    }

}


//delete puzzle



//update puzzle



module.exports = {
    createPuzzle,
    getPuzzles
}