const mongoose = require('mongoose')

const puzzleSchema = new mongoose.Schema({
    puzzleName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;
