const jwt = require("jsonwebtoken");

//  Verify Token
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).send("Token missing");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

//  Verify Admin
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).send("No token provided");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Token missing");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(403).send("Invalid token");
  }
};

module.exports = verifyAdmin;

module.exports = {
  verifyToken,
  verifyAdmin
};