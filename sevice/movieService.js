import Movie from "../models/movie.js"
import movieSlots from "../models/movieSlot.js"
import httpcodes from "../codes/httpcodes.js"
import message from "../message/message.js"
class MovieService {
    /** addMoviesService */
    async addMovieService(req) {
        try {
            const adminId = req.user.user_id;

            const { movie_title, release_date, duration, total_seats, start_time, end_time, price, available_seats } = req.body
            const movie_details = {
                movie_title: movie_title,
                release_date: release_date,
                duration: duration,
                total_seats: total_seats,
                admin_id: adminId
            }
            const result = await Movie.create(movie_details)

            const movie_slot_details = {
                movie_id: result.dataValues.movie_id,
                start_time: start_time,
                end_time: end_time,
                price: price,
                available_seats: available_seats
            }

            const movieSlot = await movieSlots.create(movie_slot_details)
            return {
                sucess: true,
                status: httpcodes.HTTP_OK,
                message: message[202]
            }
        }
        catch (e) {
            console.log(e)

        }

    }
    /** showAllMovieService */

    async ShowALLMovies(req) {
        try {
            // const movie_details = await Movie.findAll()
            // console.log("movie", movie_details)
            // const movie_slot_details = await movieSlots.findAll()
            // console.log("slot", movie_slot_details)


            const movie_details = await Movie.findAll({
                include: [
                    {
                        model: movieSlots
                    }
                ]
            })
            return {
                sucess: true,
                status: httpcodes.HTTP_OK,
                message: message[203],
                data: movie_details
            }
            // console.log(movie_details)



        }
        catch (e) {
            console.log(e)
        }
    }
}

export default new MovieService()