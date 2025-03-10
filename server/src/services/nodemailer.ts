import nodemailer from "nodemailer";
import { CONFIG, MAIL_CONFIG } from "../config";
import { SeatsLog } from "../lib/entitites/seatLog";

const CLIENT_URL =CONFIG.CLIENT;

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
    console.log(`Mail sent on ${info.accepted}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function sendSeatBookedMail(email: string, data: SeatsLog) {
  const mailOptions = {
    from: MAIL_CONFIG.NODE_MAIL,
    to: email,
    subject: "Seat Confirmation - BookMySeat ",
    text: "Seat Confirmation",
    html: `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Seat Booking Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            background: #007bff;
            color: #ffffff;
            padding: 15px;
            font-size: 20px;
            font-weight: bold;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .details {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
        }
        .details p {
            margin: 5px 0;
            font-size: 16px;
            font-weight: bold;
            color: #555;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
        .btn {
            display: inline-block;
            padding: 12px 20px;
            margin-top: 20px;
            text-decoration: none;
            background: #007bff;
            color: #ffffff;
            font-size: 16px;
            border-radius: 5px;
        }
        .btn:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        🎉 Seat Booking Confirmed!
    </div>
    
    <div class="content">
        <p>Dear <strong>${data.booked_by.name}</strong>,</p>
        <p>Your seat booking has been successfully confirmed. Here are the details:</p>
        
        <div class="details">
            <p>💺 Seat Number: <strong>${data.seat_no}</strong></p>
            <p>📅 Date: <strong>${data.date}</strong></p>
            <p>📌 Status: <strong style="color: green;">BOOKED</strong></p>
        </div>

        <a href="${CLIENT_URL}" class="btn">View Your Booking</a>
        
        <p class="footer">If you have any questions, please contact support.</p>
    </div>
</div>

</body>
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
