const AppError = require("../utils/appError")

// handling error from mongoose
// setting it as an operational error to send a message to a user

// CastError
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

// Duplicate Error
const handleDuplicateFieldsDB = err => {
    // console.log(Object.keys(err.keyValue)[0], '💥')
    const message = `Duplicate field value: ${Object.keys(err.keyValue)[0]}. Please use another value`
    return new AppError(message, 400)
}

// Validation Error
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
}

const sendErrorDev = (err,res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}

const sendErrorProduction = (err,res) => {
    // Send to client only if error is operational
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    // If it is programming or another unknown error don't share details with the user
    } else {
        // Log error
        console.error('ERROR 💥', err)

        //Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong 😔',
        })
    }
    
}

module.exports = (err, req, res, next) => {
    // console.log(err.stack) //displays where the err happened
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
       
        let error = { ...err }

        if (err.name === 'CastError') error = handleCastErrorDB(error)
        if (err.code === 11000) error = handleDuplicateFieldsDB(error)
        if (err.name === 'ValidationError') error = handleValidationErrorDB(error)

        sendErrorProduction(error, res)
    }  
}

