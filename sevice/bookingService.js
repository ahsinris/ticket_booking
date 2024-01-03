import Movie from "../models/movie.js"
import movieSlots from "../models/movieSlot.js"
import httpcodes from "../codes/httpcodes.js"
import message from "../message/message.js"
import user from "../models/user.js";
import booking from "../models/booking.js"


class Service {
    async bookingService(req) {
        try {
            const userId = req.user.user_id;
            const { movie_id, movie_slot_id, ticket_count } = req.query

            const user_details = await user.findOne({ where: { user_id: userId } })


            const movieexist = await Movie.findOne({ where: { movie_id: movie_id } })

            if (!movieexist) {
                return {
                    sucess: false,
                    status: httpcodes.HTTP_NOT_FOUND,
                    message: message[105]
                }
            }

            const movieSlotexist = await movieSlots.findOne({ where: { movie_slot_id: movie_slot_id } })

            if (!movieSlotexist) {
                return {
                    sucess: false,
                    status: httpcodes.HTTP_NOT_FOUND,
                    message: message[106]
                }

            }

            const movieSlot = await movieSlots.findAll({
                where:
                {
                    movie_slot_id: movie_slot_id,
                    movie_id: movie_id
                }
            })
            if (!movieSlot.length) {
                return {
                    sucess: false,
                    message: message[108],
                    status: httpcodes.HTTP_BAD_REQUEST
                }
            }


            if (movieSlotexist.dataValues.available_seats < ticket_count) {
                return {
                    sucess: false,
                    status: httpcodes.HTTP_NOT_FOUND,
                    message: message[107]
                }
            }


            const single_ticket = movieSlotexist.dataValues.price
            const sgst = 0.18 * single_ticket
            const gst = 0.18 * single_ticket
            const single_ticket_fare = Number(single_ticket + sgst + gst)
            const total_price = single_ticket_fare * ticket_count
            // const total_price = Number(ticket_fare + sgst + gst)


            const movie_details = {
                user_name: user_details.dataValues.user_name,
                user_email: user_details.dataValues.email_id,
                movie_name: movieexist.dataValues.movie_title,
                movie_time: movieexist.dataValues.start_time,
                no_of_seats: ticket_count,
                single_ticket: single_ticket,
                sgst: sgst,
                gst: gst,
                single_ticket_fare: single_ticket_fare,
                total_price: total_price
            }

            const ticket_booking_details = {
                movie_id: movie_id,
                movie_slot_id: movie_slot_id,
                user_id: userId,
                ticket_count: ticket_count
            }

            const ticket_booking = await booking.create(ticket_booking_details)

            return {
                sucess: true,
                status: httpcodes.HTTP_OK,
                message: message[209],
                data: {
                    movie_details,
                    ticket_booking
                }
            }
        }
        catch (e) {
            console.log(e)

        }

    }

}

export default new Service()


// import Stripe from 'stripe';
// const stripe = new Stripe('sk_test_51OCGFbSECz6JYi9q7rKQuANxkSLjtahyHbk6MJnk9lLQq0EH4AUThSyjZW35XLjLb6VlUZaialeNlLxXbCKfHhLs00wh5oV0KX');

// const createCustomer = async () => {
//    Stripe.CustomerCreateParams = {
//     description: 'test customer',
//   };

//    Stripe.Customer = await stripe.customers.create(params);

//   console.log(customer.id);
// };
// createCustomer();
