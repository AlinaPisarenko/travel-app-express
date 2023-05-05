const fs = require('fs')

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkId = (req, res, next, val) => {
    console.log('tour id:', val)
    if (Number(req.params.id) > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }; 
    next()
}
// ROUTE HANDLERS TOURS
// GET
exports.getAllTours = (req,res) => {
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
exports.getTour = (req,res) => {

    const id = Number(req.params.id)
    const tour = tours.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

// POST
exports.createTour = (req,res) => {

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
exports.updateTour = (req,res) => {

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour>'
        }
    })
}

// DELETE
exports.deleteTour = (req,res) => {

    res.status(204).json({
        status: 'success',
        data: null
    })
}

