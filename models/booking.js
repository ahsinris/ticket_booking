import sequelize from "../db/mysql.js";
import { DataTypes } from "sequelize"
import Movie from "./movie.js";
import movieSlots from "./movieSlot.js";
import user from "./user.js";
import Payment from "./payment.js";


let booking = sequelize.define("booking", {
    booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movie_slot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    ticket_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    booking_status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    payment_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
    }
})

/**Associations */



booking.belongsTo(Movie, { foreignKey: "movie_id" })
booking.belongsTo(movieSlots, { foreignKey: "movie_slot_id" })
booking.belongsTo(user, { foreignKey: "user_id" })
booking.belongsTo(Payment, { foreignKey: "payment_id" })

Movie.hasMany(booking, { foreignKey: "movie_id" })
user.hasMany(booking, { foreignKey: "user_id" })
Payment.hasMany(booking, { foreignKey: "payment_id" })

export default booking