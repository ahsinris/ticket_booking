import movieService from "../sevice/movieService.js"
import Response from "../response/response.js"
import logger from "../logger/logger.js"
import httpcodes from "../codes/httpcodes.js";
import message from "../message/message.js";
class Controller {
    /**addMoviesController */
    async MovieController(req, res, next) {
        try {
            const result = await movieService.addMovieService(req)

            if (!result.sucess) {
                logger.error(`failed to addmovie details ${result.message}`);
                return Response.error(req, res, result.status, null, result.message)
            }

            logger.info('movie details added successfully');
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in movie controller: ${err.message}`);
            next(err)
        }
    }

    /** showALLMovieDetails */

    async ShowMoviesController(req, res, next) {
        try {
            const result = await movieService.ShowALLMovies(req)

            if (!result.sucess) {
                logger.error(`failed to fetch movie details `);
                return Response.error(req, res, httpcodes.HTTP_BAD_REQUEST, null, message[107])
            }

            logger.info('movie details fetched successfully');
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in ShowMoviesController: ${err.message}`);
            next(err)
        }
    }
}

export default new Controller()