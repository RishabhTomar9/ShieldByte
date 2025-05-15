const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Initialize Twilio client
const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendAlerts = async (result) => {
  const message = `⚠️ Fraud Alert!\nRisk Score: ${result.riskScore}\nDetails: ${result.details}`;

  try {
    // ✅ Send SMS Alert
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,  // Must be a verified Twilio number
      to: process.env.ADMIN_PHONE      // Destination phone number
    });
    console.log('SMS alert sent successfully.');
  } catch (smsError) {
    console.error('❌ Failed to send SMS alert:', smsError.message);
  }

  try {
    // ✅ Send Email Alert
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"AI Fraud System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '🚨 Fraud Alert',
      text: message,
    });

    console.log('Email alert sent successfully.');
  } catch (emailError) {
    console.error('❌ Failed to send email alert:', emailError.message);
  }
};
