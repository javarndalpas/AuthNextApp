import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userID }: any) => {
    //create a hashed token
    const hashedToken = bcrypt.hash(userID.toString(), 10)

    if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userID, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
    } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(userID, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "dde1d9177ac2d6",
            pass: "****0077"
        }
    });

    const mailOptions = {
        from: "alpas@123",
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: ` <p>Here is your  <a href"${process.env.DOMAIN}/verifyemail?token=${hashedToken}">click here<a/> to ${emailType === "VERIFY" ? "verify your email" : "Reset your Password"}<p/>`
    }
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
}