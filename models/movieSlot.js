import sequelize from "../db/mysql.js";
import { DataTypes } from "sequelize"
import Movie from "./movie.js";

const movieSlots = sequelize.define("movie_slots", {

    movie_slot_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false

    },
    end_time: {
        type: DataTypes.TIME

    },
    price: {
        type: DataTypes.INTEGER,
    },
    available_seats: {
        type: DataTypes.INTEGER,
        allowNull: false

    }

})
movieSlots.belongsTo(Movie, { foreignKey: "movie_id" })
Movie.hasMany(movieSlots, { foreignKey: "movie_id" })


export default movieSlots