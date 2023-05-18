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
        sendErrorProduction(err, res)
    }  
}