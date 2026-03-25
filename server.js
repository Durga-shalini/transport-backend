const express = require('express');
const cors = require('cors');
const http = require('http');
const dns =require('dns')
require("dotenv").config();

dns.setDefaultResultOrder("ipv4first");
const connectDB = require('./config/db');
const { initSocket } = require('./socket/socket');

const app = express();
const PORT = process.env.PORT || 5000;
// DB connect
connectDB();

// Middlewares
// app.use(cors());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/load', require('./routes/loadRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use("/api/admin", require("./routes/adminRoutes"));

//  Create HTTP server
const server = http.createServer(app);

// Initialize socket here
initSocket(server);

// Start server
server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});