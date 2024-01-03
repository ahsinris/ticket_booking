import express from 'express'
import Validation from '../validation/joi.js'
import Controller from '../controller/bookingController.js'
import tokenverfication from '../authentication/jwt.js'
const router = express.Router()

router.get('/booking', Validation.movieBookingValidation, tokenverfication, Controller.BookingController)
// router.post('/payment', Validation.paymentValidation, Controller.paymentController)

export default router