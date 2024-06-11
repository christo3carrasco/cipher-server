const hasAdmin = (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "ADMIN_ROLE") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized error",
      });
    }
    next();
  } catch (error) {
    console.error("Error login role:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const hasRole = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized error",
        });
      }
      next();
    };
  } catch (error) {
    console.error("Error login role:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { hasAdmin, hasRole };
