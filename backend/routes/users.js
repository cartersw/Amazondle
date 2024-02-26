const express = require('express')
const User = require('../models/userModel')
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
router.post('/', async (req, res) => {
    const {id, email, firstName, lastName} = req.body

    try {
        const user = await User.create({id, email, firstName, lastName})
        res.status(200).json(user)
    } catch (error){
        res.status(400).json({error: error.message})
    }
    
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

