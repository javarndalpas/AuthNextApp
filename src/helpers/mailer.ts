import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    // console.log("enter========de", hashedToken)

    if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
    } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "dde1d9177ac2d6",
            pass: "f987e0931c0077"
        }
    });

    const mailOptions = {
        from: "alpas@123",
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: ` <p> <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">click here<a/> to ${emailType === "VERIFY" ? "verify your email" : "Reset your Password"} or copy and paste the same link in your browser.
        <br>
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        <p/>`
    }

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
}