const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendOTP = async (mobile, otp) => {
  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: `+91${mobile}` 
    });

    console.log("OTP sent:", otp);

  } catch (err) {
    console.error("Twilio Error:", err);
    throw new Error("Failed to send OTP");
  }
};