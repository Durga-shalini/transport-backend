const User = require("../models/User");
const Load = require("../models/Load");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register admin
exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).send("All fields required");

        const existing = await Admin.findOne({ username });
        if (existing) return res.status(400).send("Username already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ username, password: hashedPassword });
        await admin.save();

        return res.status(201).send("Admin registered successfully");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
};

// Login admin
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).send("Invalid username or password");

        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(400).send("Invalid username or password");

        const token = jwt.sign(
            { id: admin._id, role:'ADMIN' },
            process.env.JWT_SECRET || "SECRET",
            { expiresIn: "1d" }
        );
        return res.status(200).json({ success: true, token: token });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
};

//  Get Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({
            role: { $in: ["BUYSELL", "TRANSPORTER"] }
        });

        return res.status(200).json(users);

    } catch (err) {
        console.error("Get Users Error:", err);
        return res.status(500).json("Failed to fetch users");
    }
};


//  Get All Loads
exports.getLoads = async (req, res) => {
    try {
        const loads = await Load.find()
            .populate("createdBy", "mobile role");

        return res.status(200).json(loads);

    } catch (err) {
        console.error("Get Loads Error:", err);
        return res.status(500).json("Failed to fetch loads");
    }
};


//  Stats
exports.getStats = async (req, res) => {
    try {
        const users = await User.countDocuments({
            role: { $ne: "ADMIN" }
        });

        const loads = await Load.countDocuments();

        return res.status(200).json({ users, loads });

    } catch (err) {
        console.error("Stats Error:", err);
        return res.status(500).json("Failed to fetch stats");
    }
};


//  Delete Load
exports.deleteLoad = async (req, res) => {
    try {
        const deleted = await Load.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json("Load not found");
        }

        return res.status(200).json("Deleted successfully");

    } catch (err) {
        console.error("Delete Load Error:", err);
        return res.status(500).json("Delete failed");
    }
};


//  Update Load
exports.updateLoad = async (req, res) => {
    try {
        const updated = await Load.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updated) {
            return res.status(404).json("Load not found");
        }

        return res.status(200).json(updated);

    } catch (err) {
        console.error("Update Load Error:", err);
        return res.status(500).json("Update failed");
    }
};