const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendConfirmationEmail = async (toEmail, token) => {
  const link = `http://localhost:3000/api/confirm/${token}`;
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'Confirm account registration',
      html: `
        <h3>Welcome!</h3>
        <p>Please click on the link below to confirm your account.:</p>
        <a href="${link}">Verify account</a>
      `
    });

    console.log("✅ Email đã được gửi:", info.messageId);
  } catch (err) {
    console.error("❌ Gửi email thất bại:", err);
    throw err; 
  }
};

module.exports = sendConfirmationEmail;
