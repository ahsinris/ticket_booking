import nodemailer from "nodemailer"
/** nodemailer for sending mail to user to reset password */
async function sendMail(email, user_id) {

    console.log(process.env.EMAIL_ID)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.APP_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: "reset password",
        text: `http://localhost:3000/resetPassword/${user_id}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            res.json({ Status: "Email sent successfully:" });
        }
    })
}

export default sendMail