const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

// ROUTE HANDLERS USERS

// GET
exports.getAllUsers = catchAsync(async (req,res, next) => {

        const users = await User.find()

        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            result: users.length,
            data: {
                users
        }
    })  
})

exports.getUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined'
    })
}

exports.createUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined'
    })
}

exports.updateUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined'
    })
}

exports.deleteUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined'
    })
}