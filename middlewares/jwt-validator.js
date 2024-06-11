const jwt = require("jsonwebtoken");
const { User } = require("../models");

const hasValidJwt = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token is required",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No valid token",
      });
    }

    if (!user.status) {
      return res.status(401).json({
        success: false,
        message: "No valid token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error login jwt:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { hasValidJwt };
