import sequelize from "../db/mysql.js";
import { DataTypes } from "sequelize";

import booking from "./booking.js";


let Payment = sequelize.define('Payment', {

    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    payment_method: {
        type: DataTypes.STRING,
    },
    stripe_payment_id: {
        type: DataTypes.STRING,
    },
    uuid: {
        type: DataTypes.STRING,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
});

//booking.belongsTo(Payment, { foreignKey: "booking_id" })
// Payment.belongsTo(booking, { foreignKey: "booking_id" })


export default Payment;


