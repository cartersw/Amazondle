const User = require('../models/userModel')

//GET all users
const getUsers = async (req, res)  => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}


//GET single user



//create new user
const createUser = async (req, res)  => {
    const {userName, email, firstName, lastName} = req.body

    try {
        const user = await User.create({userName, email, firstName, lastName})
        res.status(200).json(user)
    } catch (error){
        res.status(400).json({error: error.message})
    }

}


//delete user



//update user



module.exports = {
    createUser,
    getUsers
}