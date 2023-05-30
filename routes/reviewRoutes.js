const express = require('express')
const { getAllReviews, createReview, deleteReview, updateReview, setTourUserIds, getReview } = require('../controllers/reviewController')
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true }) // merging params to get tourId

router.use(authController.protect)

router
    .route('/')
    .get(getAllReviews)
    .post(
        authController.restrictTo('user'), 
        setTourUserIds,
        createReview)

router
        .route('/:id')
        .get(getReview)
        .patch(authController.restrictTo('user', 'admin'), updateReview)
        .delete(authController.restrictTo('user', 'admin'), deleteReview)
        

module.exports = router