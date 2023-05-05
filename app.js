const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const app = express()

// MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
    console.log("hello from the middleware🙂")
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// ROUTE HANDLERS TOURS
// GET
const getAllTours = (req,res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
}

// GET ONE TOUR
const getTour = (req,res) => {

    const id = Number(req.params.id)
    const tour = tours.find(el => el.id === id)

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

// POST
const createTour = (req,res) => {

    const id = Number(req.params.id)
    const tour = tours.find(el => el.id === id)

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

// PATCH
const updateTour = (req,res) => {

    if (Number(req.params.id) > tours.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'invalid id'
            })
        }; 

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour>'
        }
    })
}

// DELETE
const deleteTour = (req,res) => {

    if (Number(req.params.id) > tours.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'invalid id'
            })
        }; 

    res.status(204).json({
        status: 'success',
        data: null
    })
}


// ROUTE HANDLERS USERS

const getAllUsers = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined'
    })
}

const getUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined'
    })
}

const createUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined'
    })
}

const updateUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined'
    })
}

const deleteUser = (req,res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route is not defined'
    })
}

// ROUTES
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser)

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id', getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

// STARTING SERVER
const port = 3000
app.listen(port, () => {
    console.log(`running on port ${port}`)
})

