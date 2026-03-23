const jwt = require("jsonwebtoken");
const repo = require("../repositories/userRepository");
const { generateOTP } = require("../utils/otpService");
const { sendOTP } = require("../services/twilioService");

const axios = require("axios");

// Send OTP
exports.sendOTP = async (mobile, role) => {
    try {
        const otp = generateOTP();
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 mins

        await repo.updateOTP(mobile, otp, otpExpiry, role);


        await sendOTP(mobile, otp);
        console.log(`OTP sent to ${mobile}`);

        return "OTP Sent Successfully";

    } catch (err) {
        console.error("Send OTP Error:", err);
        throw new Error("Failed to send OTP");
    }
};


// Verify OTP
exports.verifyOTP = async (mobile, enteredOtp, role) => {
    try {
        let user = await repo.findByMobile(mobile);

        if (!user) {
            user = await repo.createUser({ mobile, role });
        }

        if (!user.otp) {
            throw new Error("No OTP found. Please request again");
        }

        if (user.otp != enteredOtp) {
            throw new Error("Invalid OTP");
        }

        if (Date.now() > user.otpExpiry) {
            throw new Error("OTP Expired");
        }

        await repo.clearOTP(mobile);

        //  Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "SECRET",
            { expiresIn: "1d" }
        );

        return token;

    } catch (err) {
        console.error("Verify OTP Error:", err);
        throw err;
    }
};