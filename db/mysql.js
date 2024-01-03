import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
export default sequelize