import httpcodes from "../codes/httpcodes.js"
import message from "../message/message.js"
import Stripe from "stripe";
import { v4 } from 'uuid'
import Payment from "../models/payment.js";
import booking from '../models/booking.js';
import movieSlots from '../models/movieSlot.js';
const stripe = new Stripe(process.env.SECRET_KEY);
class Service {

  async paymentService(req) {

    try {

      const { booking_id, amount, quantity, payment_method_types } = req.body

      const product = await stripe.products.create({
        name: 'movie ticket',
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amount,
        currency: 'inr'

      });
      const uuid = v4()

      const session = await stripe.checkout.sessions.create({
        payment_method_types: [payment_method_types],
        line_items: [{
          price: price.id,
          quantity: quantity
        }],
        mode: 'payment',
        success_url: 'http://localhost:3000/payment_sucesss?u_id=' + uuid,
        cancel_url: 'http://localhost:3000/cancel_paymentu_id=' + uuid

      })
      // console.log(session)
      // console.log(session.amount_total)

      // const stripe = require('stripe')('sk_test_51OCGFbSECz6JYi9q7rKQuANxkSLjtahyHbk6MJnk9lLQq0EH4AUThSyjZW35XLjLb6VlUZaialeNlLxXbCKfHhLs00wh5oV0KX');

      if (session) {
        const payment_details = {
          total_amount: session.amount_total,
          payment_method: payment_method_types,
          stripe_payment_id: session.id,
          uuid: uuid,
          booking_id: booking_id

        }

        const paymentinfo = await Payment.create(payment_details)
        const session_Url = session.url
        // console.log(session_Url)


        return {
          success: true,
          status: httpcodes.HTTP_OK,
          message: "session created",
          data:
          {
            paymentinfo,
            session_Url
          }

        }
      }
      else {
        return {
          success: false,
          status: httpcodes.HTTP_BAD_REQUEST,
          message: "error while creating session"
        }
      }

    }
    catch (e) {
      console.log(e)
      return {
        success: false,
        status: httpcodes.HTTP_INTERNAL_SERVER_ERROR,
        message: 'error for creating session.'
      };
    }

    // const price = await stripe.prices.create({
    //   currency: 'usd',
    //   unit_amount: 1000,
    //   recurring: {
    //     interval: 'month',
    //   },
    //   product_data: {
    //     name: 'Gold Plan',
    //   },
    // });

    // console.log("pr", price)


    /**chechout session */

    // const { amount, currency, payment_method } = req.body;

    // try {
    //   // Create a PaymentIntent
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount,
    //     currency,
    //     payment_method,
    //     automatic_payment_methods: {
    //       enabled: true,
    //       allow_redirects: 'never',
    //     },
    //   });

    //   console.log("paymentIntent:", paymentIntent);

    //   const confirmResponse = await stripe.paymentIntents.confirm(paymentIntent.id);
    //   console.log('Confirm Response:', confirmResponse);

    //   const { confirmedPaymentIntent, confirmationError } = await stripe.paymentIntents.confirm(paymentIntent.id);
    //   console.log(confirmedPaymentIntent)
    //   // console.log(paymentIntent)
    //   if (confirmationError) {
    //     console.log(confirmationError)
    //     return {
    //       success: false,
    //       status: httpcodes.HTTP_BAD_REQUEST,
    //       message: "error while making payment",
    //       error: confirmationError,
    //     };
    //   } else if (confirmedPaymentIntent && confirmedPaymentIntent.status === 'succeeded') {
    //     // console.log(paymentIntent)
    //     return {
    //       success: true,
    //       status: httpcodes.HTTP_OK,
    //       message: message[211],
    //       data: confirmedPaymentIntent,
    //     };
    //   }
    // if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_confirmation') {
    //   const { next_action } = paymentIntent;

    //   if (next_action && next_action.type === 'use_stripe_sdk') {

    //     const stripeJsUrl = next_action.use_stripe_sdk.stripe_js;
    //     console.log('Redirect the user to:', stripeJsUrl);
    //     return {
    //       success: false,
    //       status: httpcodes.HTTP_OK,
    //       message: 'Payment requires 3D Secure authentication. Redirect the user to Stripe.',
    //       stripeJsUrl: stripeJsUrl,
    //     };
    //   }

    // } else if (paymentIntent.status === 'succeeded') {
    //   return {
    //     success: true,
    //     status: httpcodes.HTTP_OK,
    //     message: message[211],
    //     data: paymentIntent,
    //   };
    // } else {
    //   console.error('Unexpected payment status:', paymentIntent.status);
    //   return {
    //     success: false,
    //     status: httpcodes.HTTP_BAD_REQUEST,
    //     message: 'Payment failed. Check server logs for details.',
    //   };
    // }
    // } catch (error) {
    //   console.error('Error processing payment:', error.message);
    //   return {
    //     success: false,
    //     status: httpcodes.HTTP_BAD_REQUEST,
    //     message: 'Payment failed. Check server logs for details.',
    //     error: error,
    //   };
    // }


    // const { amount, booking_id, payment_method, currency } = req.body


    // try {
    //   // Create a PaymentIntent
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount,
    //     currency,
    //     payment_method,
    //     automatic_payment_methods: {
    //       enabled: true,
    //       allow_redirects: 'never',
    //     },
    //   });

    //   // console.log(paymentIntent)

    //   const confirmedIntent = await stripe.paymentIntents.confirm(paymentIntent.id);

    //   console.log("-----------", confirmedIntent);

    //   if (confirmedIntent.status === 'succeeded') {
    //     return {
    //       success: true,
    //       status: httpcodes.HTTP_OK,
    //       message: message[211],
    //       data: confirmedIntent,
    //     };
    //   } else {
    //     console.error('Payment confirmation failed:', confirmedIntent.last_payment_error);
    //     return {
    //       success: false,
    //       status: httpcodes.HTTP_BAD_REQUEST,
    //       message: message[112],
    //     };
    //   }
    // } catch (error) {
    //   console.error('Error processing payment:', error.message);
    // }
    // try {

    //   const { amount, booking_id, payment_method, currency } = req.body

    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount,
    //     currency,
    //     payment_method,
    //     confirmation_method: 'manual',
    //     confirm: true,
    //     return_url: 'https://your-website.com/success', 
    //   });

    //   console.log(paymentIntent)

    //   const result = await stripe.paymentIntents.confirm(paymentIntent.id);

    //   console.log(result)

    //   // console.log(paymentIntent)

    //   // const payment_Intent = await stripe.paymentIntents.retrieve('pi_3OFtjGSECz6JYi9q0aJTZXKw');

    //   // if (paymentIntent.status === 'requires_action' && paymentIntent.next_action.type === 'use_stripe_sdk') {
    //   //   const stripeJsUrl = paymentIntent.next_action.use_stripe_sdk.stripe_js;
    //   //   console.log('Redirect the user to:', stripeJsUrl);
    //   // }



    //   if (paymentIntent.status === 'succeeded') {
    //     return {
    //       sucess: true,
    //       status: httpcodes.HTTP_OK,
    //       message: message[211],
    //       data: paymentIntent
    //     }
    //   }
    //   else {
    //     return {
    //       sucess: false,
    //       status: httpcodes.HTTP_BAD_REQUEST,
    //       message: message[112]
    //     }
    //   }



    // }
    // catch (e) {
    //   console.log(e)
    // }
  }
  async sucessPaymentService(req, res) {
    try {

      const uuid = req.query.u_id
      const payment_details = await Payment.findOne({
        where: {
          uuid: uuid
        }
      })
      if (!payment_details) {
        return {
          sucess: false,
          status: httpcodes.HTTP_BAD_REQUEST,
          message: message[113]
        }
      }
      const stripeid = payment_details.dataValues.stripe_payment_id
      const bookingId = payment_details.dataValues.booking_id
      const paymentId = payment_details.dataValues.payment_id
      const sessionDeatils = await stripe.checkout.sessions.retrieve(stripeid
      );

      /** update payment status on the payment table */

      const updatePaymentDetails = {
        order_status: "confirmed",
        payment_status: sessionDeatils.payment_status
      }

      const updatePayment = await Payment.update(updatePaymentDetails, { where: { uuid: uuid } })

      /**update booking status on the booking table */

      const moviebookingDetails = {
        booking_status: "booked",
        payment_id: paymentId

      }
      const moviebooking = await booking.update(moviebookingDetails, {
        where: {
          booking_id: bookingId
        }
      })

      const movieDetails = await booking.findOne({
        where: {
          booking_id: bookingId
        }
      })

      const movieSlotId = movieDetails.dataValues.movie_slot_id

      const movieSlotDetails = await movieSlots.findOne({
        where: {
          movie_slot_id: movieSlotId
        }
      })

      /**reduce the booked ticket count on movie slot table */

      const reduceTicketCount = (movieSlotDetails.dataValues.available_seats) - (movieDetails.dataValues.ticket_count)

      const updateTicketCount = await movieSlots.update({ available_seats: reduceTicketCount }, {
        where: {
          movie_slot_id: movieSlotId

        }
      })
      if (!updateTicketCount) {
        return {
          sucess: true,
          status: httpcodes.HTTP_OK,
          message: message[212],
          data: sessionDeatils
        }
      }


      // return res.status(200).json({
      //   status: 200,
      //   message: "payment sucess",
      //   data: sessionDeatils
      //   // query: {
      //   //     sessionDeatils,
      //   //     updatePayment
      //   // },
      // })

    }
    catch (err) {
      console.log(err)

      //   console.log("error in sucess" + err)
      //   logger.error(`Error in sucessPayment controller: ${err.message}`);
    }
  }

  async cancelPaymentService(req, res, next) {
    try {
      const uuid = req.query.u_id
      const payment_details = await Payment.findOne({
        where: {
          uuid: uuid
        }
      })
      const stripeid = payment_details.dataValues.stripe_payment_id
      const bookingId = payment_details.dataValues.booking_id
      const paymentId = payment_details.dataValues.payment_id
      const sessionDeatils = await stripe.checkout.sessions.retrieve(stripeid);

      /** update payment status on the payment table */

      const updatePaymentDetails = {
        order_status: "canceled",
        payment_status: sessionDeatils.payment_status
      }
      const updatePayment = await Payment.update(updatePaymentDetails, { where: { uuid: uuid } })

      /**update booking status on the booking table */

      const moviebookingDetails = {
        booking_status: "not booked",
        payment_id: paymentId

      }
      const moviebooking = await booking.update(moviebookingDetails, {
        where: {
          booking_id: bookingId
        }
      })
      return {
        sucess: false,
        status: httpcodes.HTTP_BAD_REQUEST,
        message: message[116],
        data: sessionDeatils
      }
      // return res.status(400).json({
      //   status: 400,
      //   message: "payment was cancelled",
      //   query: req.query,
      //   body: req.body,
      //   params: req.params
      // })

    }
    catch (err) {
      console.log(err)
    }
  }
}

export default new Service()




















/**const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/process-payment', async (req, res) => {
  try {
    // Get payment details from the request
    const { amount, currency, payment_method } = req.body;

    // Create a PaymentIntent with the specified amount, currency, and payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method,
      confirmation_method: 'manual',
      confirm: true,
    });

    // If the payment is successful, return the payment data
    if (paymentIntent.status === 'succeeded') {
      res.status(200).json({ paymentIntent });
    } else {
      res.status(400).json({ error: 'Payment failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 */