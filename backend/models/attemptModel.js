const mongoose = require('mongoose')


const attemptSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    puzzleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Puzzle',
        required: true
    },
    attemptNumber: {
        type: Number,
        required: true
    },
    success: {
        type: Boolean,
        required: true
    },
    timeTaken: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = Attempt;
