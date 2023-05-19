const mongoose = require('mongoose')
const dotenv = require('dotenv')


// Handling uncaught exceptions
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION 💥💥💥 Shutting down')
    console.log(`${err.name}: ${err.message}.`)
    process.exit(1); 
})


dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('DB connection successful'))

// STARTING SERVER
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`running on port ${port}`)
})


// Handling unhandled rejections
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION 💥💥💥 Shutting down')
    console.log(err.name)
    server.close(() => {
        process.exit(1); //1 - uncaught exception
    })  
})


