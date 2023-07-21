const express = require('express');
const path = require('path')
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')
const cors=require('cors');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())
// Set pug engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// GLOBAL MIDDLEWARE


const corsOptions ={
   origin: true, 
   credentials: true,            //access-control-allow-credentials:true
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) 

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Set security HTTP headers
// app.use(helmet())

// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// app.use((req, res, next) => {
//   res.setHeader(
//     'Content-Security-Policy',
//     "script-src 'self' api.mapbox.com",
//     "script-src-elem 'self' api.mapbox.com",
//   );
//   next();
// });

// Configuration for mapbox
// const scriptSrcUrls = [
//   'https://api.tiles.mapbox.com/',
//   'https://api.mapbox.com/',
// ];
// const styleSrcUrls = [
//   'https://api.mapbox.com/',
//   'https://api.tiles.mapbox.com/',
//   'https://fonts.googleapis.com/',
// ];
// const connectSrcUrls = [
//   'https://api.mapbox.com/',
//   'https://a.tiles.mapbox.com/',
//   'https://b.tiles.mapbox.com/',
//   'https://events.mapbox.com/',
// ];
// const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", 'blob:'],
//       objectSrc: [],
//       imgSrc: ["'self'", 'blob:', 'data:'],
//       fontSrc: ["'self'", ...fontSrcUrls],
//     },
//   })
// );

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Limit amount of request per one IP address
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour'
})

app.use('/api', limiter)

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));


// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS 
app.use(xss())


// Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration', 
        'ratingsQuantity', 
        'ratingsAverage', 
        'maxGroupSize', 
        'difficulty', 
        'price']
}))



// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    // console.log(req.cookies)
    next()
})

// Routes

app.use('/', viewRouter)

// API Routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app

