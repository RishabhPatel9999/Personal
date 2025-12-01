const jwt = require("jsonwebtoken");
const SECRET_KEY = "mySecretKey";

const verifyToken = (req, res, next) => {

  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid Authorization Format" });
  }

  const actualToken = tokenParts[1];

  try {
    const verified = jwt.verify(actualToken, SECRET_KEY);
    req.user = verified; // attach decoded payload
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = { verifyToken, SECRET_KEY };
