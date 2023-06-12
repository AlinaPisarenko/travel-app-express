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
    const message = `Duplicate field value: ${Object.keys(err.keyValue)[0]}. Please use another value`
    return new AppError(message, 400)
}

// Validation Error
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
}

// Invalid JWT Error
const handleJWTError = () => new AppError('Invalid token. Please log in again', 401)

// Expired JWT Error
const handleJWTExpiredError = () => new AppError('You token has expired. Please log in again', 401)

const sendErrorDev = (err,req, res) => {

    //A) API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
        })
    } 
    
    //B) RENDERED WEBSITE
    console.error('ERROR 💥', err);

    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong',
        msg: err.message
    })
}

const sendErrorProduction = (err,req,res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  });
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    } else if (process.env.NODE_ENV === 'production') {
       
        let error = { ...err }
        error.message = err.message

        if (err.name === 'CastError') error = handleCastErrorDB(error)
        if (err.code === 11000) error = handleDuplicateFieldsDB(error)
        if (err.name === 'ValidationError') error = handleValidationErrorDB(error)
        if (err.name === 'JsonWebTokenError') error = handleJWTError()
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()
        sendErrorProduction(error,req, res)
    }  
}

