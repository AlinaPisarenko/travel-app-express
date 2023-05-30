const express = require('express')
const { getAllTours, createTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan } = require('./../controllers/tourController')
const authController = require('../controllers/authController')
const reviewRouter = require('../routes/reviewRoutes')


const router = express.Router()

router.use('/:tourId/reviews', reviewRouter)

router
    .route('/top-5-cheap')
    .get(aliasTopTours, getAllTours)

router
    .route('/monthly-plan/:year')
    .get(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide', 'guide'), 
        getMonthlyPlan
        )

router
    .route('/tour-stats')
    .get(getTourStats)

router
    .route('/')
    .get(getAllTours)
    .post(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        createTour
    )

router
    .route('/:id')
    .get(getTour)
    .patch(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        updateTour
        )
    .delete(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        deleteTour
    )


module.exports = router