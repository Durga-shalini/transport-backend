const service = require('../services/authService');

//  Send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { mobile, role } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    const msg = await service.sendOTP(mobile, role);

    return res.status(200).json({ success: true,message: msg
    });

  } catch (err) {
    console.error("Send OTP Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP"
    });
  }
};


//  Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { mobile, otp, role } = req.body;
    if (!mobile || !otp) {
      return res.status(400).json({
        message: "Mobile and OTP are required"
      });
    }

    if (!/^[0-9]{4,6}$/.test(otp)) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    const token = await service.verifyOTP(mobile, otp, role);

    return res.status(200).json({
      success: true,
      token
    });

  } catch (err) {
    console.error("Verify OTP Error:", err);

    return res.status(400).json({
      success: false,
      message: err.message || "OTP verification failed"
    });
  }
};