const Tour = require('./../models/tourModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const factory = require('./handlerFactory')

exports.aliasTopTours = (req,res,next) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
    next()
}

// ROUTE HANDLERS TOURS
// GET
exports.getAllTours = factory.getAll(Tour)

// GET ONE TOUR
exports.getTour = factory.getOne(Tour, { path: 'reviews' })
// POST
exports.createTour = factory.createOne(Tour)
// PATCH
exports.updateTour = factory.updateOne(Tour)
// DELETE
exports.deleteTour = factory.deleteOne(Tour)



exports.getTourStats = catchAsync(async (req,res, next) => {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' } ,
                    numTours: { $sum: 1 },
                    numOfRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            }   
        ])

         res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        })
})

exports.getMonthlyPlan = catchAsync(async (req,res, next) => {
        const year = Number(req.params.year)
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: { 
                    startDates: { 
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    tours: { $push: '$name' }

                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $project: {
                    _id: 0,

                }
            },
            {
                $sort: { numTourStarts: -1 }
            }
        ])

        res.status(200).json({
            status: 'success',
            data: {
                plan
            }
        })
})