const express = require('express')
const { getCheckoutSession } = require('../controllers/bookingController')
const authController = require('../controllers/authController')

const router = express.Router() // merging params to get tourId

router.get('/checkout-session/:tourID', authController.protect, getCheckoutSession)




module.exports = router