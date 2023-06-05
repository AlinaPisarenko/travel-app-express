const express = require('express')
const { getAllTours, createTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan, getToursWithin, getDistances } = require('./../controllers/tourController')
const authController = require('../controllers/authController')
const reviewRouter = require('../routes/reviewRoutes')
// const { originAgentCluster } = require('helmet')

// const CSP = 'Content-Security-Policy';
// const POLICY =
//   "default-src 'self' https://*.mapbox.com ;" +
//   "base-uri 'self';block-all-mixed-content;" +
//   "font-src 'self' https: data:;" +
//   "frame-ancestors 'self';" +
//   "img-src http://localhost:8000 'self' blob: data:;" +
//   "object-src 'none';" +
//   "script-src https: cdn.jsdelivr.net cdnjs.cloudflare.com api.mapbox.com 'self' blob: ;" +
//   "script-src-attr 'none';" +
//   "style-src 'self' https: 'unsafe-inline';" +
//   'upgrade-insecure-requests;';

const router = express.Router()

// router.use((req, res, next) => {
//   res.setHeader(CSP, POLICY);
//   next();
// });


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
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(getToursWithin)

router
    .route('/distances/:latlng/unit/:unit')
    .get(getDistances)

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