import jwt from "jsonwebtoken"
import response from "../response/response.js"
import httpcodes from "../codes/httpcodes.js"
import message from "../message/message.js"


/** token verfication */
const tokenverfication = async (req, res, next) => {

    try {
        let accesstoken = req.headers.authorization

        if (!accesstoken) {
            return response.error(req, res, httpcodes.HTTP_BAD_REQUEST, null, message[103])
        }
        req.user = jwt.verify(accesstoken, process.env.SECRETKEY)

        next()

    }
    catch (err) {
        next(err)
    }

}
export default tokenverfication 