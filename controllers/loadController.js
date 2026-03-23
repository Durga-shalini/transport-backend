import Notification from "../models/Notification.js";
import service from "../services/loadService.js";
import { getIO } from "../socket/socket.js";

//  Create Load
export const createLoad = async (req, res) => {
  try {
    const { origin, destination, date, material, weight, price } = req.body;

    if (!origin || !destination || !date || !material || !weight || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const load = await service.createLoad(req.body, req.user.id);
    const notification = await Notification.create({
      userRole: "TRANSPORTER",
      message: `New Load: ${load.origin} → ${load.destination}`,
      loadId: load._id
    });

    const io = getIO();
    io.to("TRANSPORTER").emit("new_load", {
      message: notification.message,
      createdAt: notification.createdAt,
      load
    });

    return res.status(201).json({  success: true,  data: load });

  } catch (err) {
    console.error("Create Load Error:", err);

    return res.status(500).json({
      success: false,
      message: "Error creating load"
    });
  }
};


// Get Loads
export const getLoads = async (req, res) => {
  try {
    const data = await service.getLoads(req.user.role, req.user.id);

    return res.status(200).json({success: true, data
    });

  } catch (err) {
    console.error("Get Loads Error:", err);

    return res.status(500).json({
      success: false,
      message: "Error fetching loads"
    });
  }
};


export const deleteLoad = async (req, res) => {
  try {
    const deleted = await service.deleteLoad(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false,  message: "Load not found"
      });
    }

    return res.status(200).json({success: true,message: "Deleted successfully"
    });

  } catch (err) {
    console.error("Delete Load Error:", err);

    return res.status(500).json({ success: false,  message: "Error deleting load"
    });
  }
};