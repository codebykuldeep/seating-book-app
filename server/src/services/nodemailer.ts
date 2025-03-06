import nodemailer from "nodemailer";
import { MAIL_CONFIG } from "../config";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_CONFIG.NODE_MAIL,
    pass: MAIL_CONFIG.NODE_PASS,
  },
});

export async function sendLoginVerification(email: string, otp: number) {
  const mailOptions = {
    from: MAIL_CONFIG.NODE_MAIL,
    to: email,
    subject: "Hello From BookMySeat ",
    text: "Login Verification",
    html: `<h1>Hello ,Welcome to Book My Seat</h1>
              <p>Email - ${email}</p>
              <p>Your Login OTP is ${otp}</p>
              <p>Valid for only 5 mins</p>
              `,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
