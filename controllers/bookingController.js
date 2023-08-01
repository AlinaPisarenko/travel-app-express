const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Tour = require('./../models/tourModel')
const Booking = require('../models/bookingModel');
const catchAsync = require('./../utils/catchAsync')
const factory = require('./handlerFactory')
const AppError = require('./../utils/appError')

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1. Get currently booked tour
    const tour = await Tour.findById(req.params.tourID)

    // 2. Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourID,
        line_items: [
            {
            price_data: {
                unit_amount: tour.price * 100,
                currency: 'usd',
                product_data: {
                    name: `${tour.name} Tour`,
                    description: tour.summary,
                    images: [`https://www.natours.dev/img/tours/${tour.imageCover}.jpg`],
                }
            },    
            quantity: 1
            }
        ],
        mode: 'payment'
    })

   // 3. Create session as a response
   res.status(200).json({
    status: 'success',
    session
   })
})