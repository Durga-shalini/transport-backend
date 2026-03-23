const router = require('express').Router();
const {
    getUsers,
    getLoads,
    deleteLoad,
    getStats,
    updateLoad,
    registerAdmin, loginAdmin
} = require("../controllers/adminController");

const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/users", verifyAdmin, getUsers);
router.get("/loads", verifyAdmin, getLoads);
router.delete("/load/:id", verifyAdmin, deleteLoad);
router.put("/load/:id", verifyAdmin, updateLoad);
router.get("/stats", verifyAdmin, getStats);


module.exports = router;