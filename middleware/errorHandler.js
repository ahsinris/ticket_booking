/** common error handler */
function errorHandler(err, req, res, next) {
    console.log(err)

    return res.status(500).json({
        status: 500,
        message: "internal server error" + e
    })
}

export default errorHandler