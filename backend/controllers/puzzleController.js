const Puzzle = require('../models/puzzleModel');
const mongoose = require('mongoose');

// GET all puzzles
const getPuzzles = async (req, res) => {
    const puzzles = await Puzzle.find({}).sort({createdAt: -1});
    res.status(200).json(puzzles);
};

// GET single puzzle
const getPuzzle = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'});
    }
    const puzzle = await Puzzle.findById(id);
    if (!puzzle) {
        return res.status(404).json({error: 'No such puzzle'});
    }
    res.status(200).json(puzzle);
};

// Create new puzzle
const createPuzzle = async (req, res) => {
    const { puzzleName, description, solution, difficultyLevel } = req.body;
    try {
        const puzzle = await Puzzle.create({ puzzleName, description, solution, difficultyLevel });
        res.status(200).json(puzzle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete puzzle
const deletePuzzle = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'});
    }
    const puzzle = await Puzzle.findOneAndDelete({_id: id});
    if (!puzzle) {
        return res.status(404).json({error: 'No such puzzle'});
    }
    res.status(200).json(puzzle);
};

// Update puzzle
const updatePuzzle = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'});
    }
    const puzzle = await Puzzle.findOneAndUpdate({_id: id}, {...req.body}, {new: true});
    if (!puzzle) {
        return res.status(404).json({error: 'No such puzzle'});
    }
    res.status(200).json(puzzle);
};

module.exports = {
    createPuzzle,
    getPuzzles,
    getPuzzle,
    deletePuzzle,
    updatePuzzle
};