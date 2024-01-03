// Middleware to check if the user is an admin
import user from "../models/user.js";
const isAdmin = async (req, res, next) => {
    const userId = req.user.user_id;
    const users = await user.findByPk(userId);
    // console.log(users.role)

    if (!users || users.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Only admins can perform this action.' });
    }
   
    next();
};
export default isAdmin