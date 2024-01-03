import express from "express";
import dotenv from 'dotenv'
import sequelize from "./db/mysql.js";



dotenv.config()
const app = express()
app.use(express.json())


/**router */
import userRouter from './router/userRouter.js'
import movieRouter from './router/movieRouter.js'
import bookingouter from './router/bookingRouter.js'
import paymentRouter from './router/paymentRouter.js'



app.use(userRouter)
app.use(movieRouter)
app.use(bookingouter)
app.use(paymentRouter)

sequelize.sync()
    .then(() => {
        console.log(`connection established sucessfully`)
    })
    .catch((e) => {
        console.log(e)
    })
sequelize.authenticate()
    .then(() => {
        console.log(`connection established sucessfully`)
    })
    .catch((err) => {
        console.log("error", err)
    })
app.listen(process.env.PORT, () => {
    console.log(`port listned at ${process.env.PORT}`)
})