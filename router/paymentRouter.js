import express from 'express'
import Validation from '../validation/joi.js'
import Controller from '../controller/paymentController.js'
import tokenverfication from '../authentication/jwt.js'
const router = express.Router()

router.post('/payment', Validation.paymentValidation, Controller.PaymentController)
router.get('/payment_sucesss', Controller.sucessPayment)
router.get('/cancel_payment', Controller.cancelPayment)

export default router