const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { OtpModel } = require('./db');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

async function sendOtpEmail(email) {
  const otp = generateOTP();

  const mailOptions = {
    from: `"OTP SERVICE" <${process.env.USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
    html: `<h3>Your OTP code is: <b>${otp}</b></h3>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");

    await OtpModel.create({ email: email, otp: otp });
    console.log("OTP saved to DB");

    return otp;
  } catch (err) {
    console.error("Error in sendOtpEmail:", err);
    throw err;
  }

}

module.exports = { sendOtpEmail };

