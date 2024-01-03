import joi from 'joi'

class Validation {
    /***userValidation */

    /**registerUserValidation */

    async registerValidation(req, res, next) {
        try {
            let schema;

            if (req.body.role && req.body.role.toLowerCase() === 'admin') {
                // Admin registration
                schema = joi.object({
                    user_name: joi.string().required(),
                    email_id: joi.string().email().required(),
                    phone_number: joi.string().required(),
                    password: joi.string().min(1).max(10).required(),
                    role: joi.string().valid('admin').required(),
                }).unknown(true);;
            } else {
                // User registration
                schema = joi.object({
                    user_name: joi.string().required(),
                    email_id: joi.string().email().required(),
                    phone_number: joi.string().required(),
                    password: joi.string().min(1).max(10).required(),
                });
            }

            await schema.validateAsync(req.body);

            next();
        }
        catch (err) {
            next(err)
        }


    }
    /**loginUserValidation */

    async loginValidation(req, res, next) {
        try {
            const schema = joi.object({
                email_id: joi.string().email().required(),
                password: joi.string().min(1).max(10).required()
            })

            await schema.validateAsync(req.body)

            next()
        }
        catch (err) {
            next(err)
        }


    }

    /** forget password */

    async forgetPasswordValidation(req, res, next) {
        try {
            const schema = joi.object({
                email_id: joi.string().email().required(),
            })

            await schema.validateAsync(req.body)

            next()
        }
        catch (err) {
            next(err)
        }


    }

    /** reset password validation */

    async resetPasswordValidation(req, res, next) {
        try {
            const schema = joi.object({
                password: joi.string().min(1).max(10).required()
            })

            await schema.validateAsync(req.body)

            next()
        }
        catch (err) {
            next(err)
        }


    }

    /*** update profile validation */

    async updateProfileValidation(req, res, next) {
        try {
            const schema = joi.object({
                email_id: joi.string().email().required()
            })

            await schema.validateAsync(req.body)

            next()
        }
        catch (err) {
            next(err)
        }


    }

    /*** addMoviesValidation */

    async addMoviesValidation(req, res, next) {
        try {
            const schema = joi.object({
                movie_title: joi.string().required(),
                release_date: joi.date().required(),
                duration: joi.string().required(),
                total_seats: joi.number().required(),
                start_time: joi.date().iso().required(),
                end_time: joi.date().iso().min(joi.ref('start_time')).required(),
                price: joi.number().required(),
                available_seats: joi.number().required()

            })

            await schema.validateAsync(req.body)

            next()
        }
        catch (err) {
            next(err)
        }


    }

    /** movieBookingValidation */

    async movieBookingValidation(req, res, next) {
        try {
            const schema = joi.object({
                movie_id: joi.number().required(),
                movie_slot_id: joi.number().required(),
                ticket_count: joi.number().required(),

            })

            await schema.validateAsync(req.query)

            next()

        }
        catch (err) {
            next(err)
        }
    }
    /** PaymentValidation */
    async paymentValidation(req, res, next) {
        try {

            const schema = joi.object({
                amount: joi.number().required(),
                quantity: joi.number().required(),
                payment_method_types: joi.string().required(),
                booking_id: joi.number().required()

                // amount: joi.number().required(),
                // payment_method: joi.string().required(),
                // currency: joi.string().required()

            })

            await schema.validateAsync(req.body)

            next()

        }
        catch (err) {
            next(err)
        }
    }
}
export default new Validation()