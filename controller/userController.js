import UserService from "../sevice/userService.js"
import message from "../message/message.js"
import httpCodes from "../codes/httpcodes.js"
import Response from "../response/response.js"
import winston from "winston"
import logger from "../logger/logger.js"

class Controller {

    /** sigup Controller */

    async signupController(req, res, next) {
        try {

            const result = await UserService.signupService(req.body)

            if (!result.sucess) {
                logger.error(`Signup failed: ${result.message}`);
                return Response.error(req, res, result.status, null, result.message)
            }

            logger.info('User signed up successfully');
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in signup controller: ${err.message}`);
            next(err)
        }
    }
    /**login controller */

    async loginController(req, res, next) {
        try {

            const result = await UserService.loginService(req.body)

            if (!result.sucess) {
                logger.error(`Login failed: ${result.message}`);
                return Response.error(req, res, result.status, null, result.message)
            }
            logger.info('User logged in successfully.');
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in login controller: ${err.message}`);
            next(err)
        }
    }

    /**forget password controller */

    async forgetPasswordController(req, res, next) {
        try {

            const result = await UserService.forgetPasswordService(req)

            if (!result.sucess) {
                logger.error(`reset pasword  mail send failed: ${result.message}`);
                return Response.error(req, res, result.status, null, result.message)
            }
            logger.info('reset password mail send successfully');
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in forgetPasswordController: ${err.message}`);
            next(err)
        }
    }

    /** resetpassword controller*/

    async resetPasswordController(req, res, next) {
        try {

            const result = await UserService.resetPasswordService(req)

            if (!result.sucess) {
                logger.error(`paswword reset  failed: ${result.message}`);
                return Response.error(req, res, result.status, null, result.message)
            }
            logger.info('password successfully reseted.');
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in resetPasswordController: ${err.message}`);
            next(err)
        }
    }

    /**updateprofile controller */


    async updateController(req, res, next) {
        try {

            const result = await UserService.UpdateProfileService(req)

            if (!result.sucess) {
                logger.error(`update failed: ${result.message}`);
                return Response.error(req, res, result.status, null, result.message)
            }
            logger.info('user details updated  successfully.');
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in update controller: ${err.message}`);
            next(err)
        }
    }

    /*** payment controller */





}


export default new Controller()