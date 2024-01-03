import express from 'express'
import Validation from '../validation/joi.js'
import Controller from '../controller/userController.js'
import tokenverfication from '../authentication/jwt.js'
const router = express.Router()

router.post('/register', Validation.registerValidation, Controller.signupController)
router.post('/login', Validation.loginValidation, Controller.loginController)
router.put('/UpdateProfile', tokenverfication, Validation.updateProfileValidation, Controller.updateController)
router.post('/forgetPassword', Validation.forgetPasswordValidation, Controller.forgetPasswordController)
router.put('/resetPassword/:id', Validation.resetPasswordValidation, Controller.resetPasswordController)


export default router