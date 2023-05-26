const express = require('express')
const { getAllReviews, createReview } = require('../controllers/reviewController')
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true }) // merging params to get tourId

router
    .route('/')
    .get(getAllReviews)
    .post(
        authController.protect, 
        authController.restrictTo('user'), 
        createReview)


module.exports = router