import sequelize from "../db/mysql.js";
import { DataTypes } from "sequelize"
import user from "./user.js";
const Movie = sequelize.define("Movie", {
    movie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    movie_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    release_date: {
        type: DataTypes.DATE,
    },
    duration: {
        type: DataTypes.STRING,
    },
    total_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

})

Movie.belongsTo(user, { foreignKey: "admin_id" })
export default Movie