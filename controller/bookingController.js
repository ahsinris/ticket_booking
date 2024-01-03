import Service from "../sevice/bookingService.js"
import Response from "../response/response.js"
import logger from "../logger/logger.js"
import message from "../message/message.js";
import httpcodes from "../codes/httpcodes.js";
class Controller {
    async BookingController(req, res, next) {

        try {

            const result = await Service.bookingService(req)

            if (!result.sucess) {
                logger.error(`failed to fetch  booking movies details ${result.message}`);
                return Response.error(req, res, result.status, null, result.message)
            }

            logger.info('fetched movies booked details  successfully');
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in BookingController: ${err.message}`);
            next(err)
        }
    }

    //     async paymentController(req, res, next) {
    //         try {

    //             const result = await Service.paymentService(req)

    //             if (!result.sucess) {
    //                 logger.error(`payment failed ${result.message}`);
    //                 return Response.error(req, res, result.status, null, result.message)
    //             }

    //             logger.info('payment successfully');
    //             return Response.sucess(req, res, result.status, result.data, result.message)

    //         }
    //         catch (err) {
    //             logger.error(`Error in paymentController: ${err.message}`);
    //             next(err)
    //         }
    //     }
    //     async paymentsController(req, res, next) {
    //         try {

    //             const result = await Service.payments(req)

    //             if (!result.sucess) {
    //                 // logger.error(`payment failed ${result.message}`);
    //                 return Response.error(req, res, httpcodes.HTTP_BAD_REQUEST, null, message[100])
    //             }

    //             logger.info('payment successfully');
    //             return Response.sucess(req, res, result.status, result.data, result.message)

    //         }
    //         catch (err) {
    //             logger.error(`Error in paymentsController: ${err.message}`);
    //             next(err)
    //         }
    //     }

}



export default new Controller()