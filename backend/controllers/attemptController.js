const Attempt = require('../models/attemptModel');

//GET all puzzles
const getAttempts = async (req, res) => {
    try {
        const attempts = await Attempt.find({}).sort({attemptDate: -1});
        res.status(200).json(attempts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createAttempt = async (req, res) => {
    const { userId, puzzleId, attemptNumber, success, timeTaken } = req.body;
    try {
        const attempt = await Attempt.create({userId, puzzleId, attemptNumber, success, timeTaken 
        });
        res.status(200).json(attempt);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAttempts,
    createAttempt,
    
};