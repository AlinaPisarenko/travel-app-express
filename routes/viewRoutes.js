const express = require('express')
const { getOverview, getTour, getLoginForm, getSignupForm, getAccount, updateUserData } = require('../controllers/viewsController')
const authController = require('../controllers/authController')
const bookingController = require('../controllers/bookingController')


const router = express.Router()

router.get('/',bookingController.createBookingCheckout, authController.isLoggedIn, getOverview)
router.get('/tour/:slug', authController.isLoggedIn, getTour)
router.get('/login',authController.isLoggedIn, getLoginForm)
router.get('/signup',authController.isLoggedIn, getSignupForm)
router.get('/me', authController.protect, getAccount)
router.post('/submit-user-data', authController.protect, updateUserData)

module.exports = router