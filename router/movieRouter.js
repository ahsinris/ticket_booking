import express from 'express'
import Validation from '../validation/joi.js'
const router = express.Router()
import tokenverfication from '../authentication/jwt.js'
import isAdmin from '../middleware/admin.js'
import Controller from '../controller/movieController.js'

/**add movies only admin can add or modify movie details */
router.post('/addMovies', Validation.addMoviesValidation, tokenverfication, isAdmin, Controller.MovieController)

/**movie details */
router.get('/showMovies', Controller.ShowMoviesController)

export default router