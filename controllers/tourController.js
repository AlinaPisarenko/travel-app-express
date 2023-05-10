const Tour = require('./../models/tourModel')

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// exports.checkId = (req, res, next, val) => {
//     console.log('tour id:', val)
//     if (Number(req.params.id) > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'invalid id'
//         })
//     }; 
//     next()
// }

// ROUTE HANDLERS TOURS
// GET
exports.getAllTours = async (req,res) => {
    
    try {
        const tours = await Tour.find()

    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    
}

// GET ONE TOUR
exports.getTour = async (req,res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        // const tour = await Tour.findOne({ _id: req.params.id })
        
        res.status(200).json({
          status: 'success',
          data: {
            tour
        }
    })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    
}

// POST
exports.createTour = async (req,res) => {
    try {
        // const newTour = new Tour({})
        // newTour.save()
        const newTour = await Tour.create(req.body)
    
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
    });
    } catch (err) {
        res.status(400).json({
        status: 'fail',
        message: "Invalid data sent 🥲"
    }); 
    }

}

// PATCH
exports.updateTour = async (req,res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    } 
}

// DELETE
exports.deleteTour = async (req,res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
        status: 'success',
        data: null
    })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    
}

