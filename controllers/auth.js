const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { User } = require("../models");
const { generateJWT } = require("../helpers/gen-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No valid info",
      });
    }

    if (!user.status) {
      return res.status(401).json({
        success: false,
        message: "No valid info",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "No valid info",
      });
    }

    const token = await generateJWT(user.id);

    res.status(202).json({
      success: true,
      message: "User login successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error login user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { login };
