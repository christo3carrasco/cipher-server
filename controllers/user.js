const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { User } = require("../models");

//POST
const userPost = async (req = request, res = response) => {
  try {
    const { password, ...body } = req.body;
    const user = new User({ ...body });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    user.role = "USER_ROLE";
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//GET
const usersGet = async (req = request, res = response) => {
  try {
    const { status, email } = req.query;

    const filters = {};

    if (status) {
      filters.status = status;
    }

    if (email) {
      filters.email = email;
    }

    const users = await User.find(filters);

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users found successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//GET
const userGet = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    return res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//PUT
const userPut = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const { password, ...body } = req.body;

    if (password) {
      const salt = bcryptjs.genSaltSync();
      body.password = bcryptjs.hashSync(password, salt);
    }

    let user = await User.findById(id);
    user.set(body);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//DELETE
const userDelete = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    user.status = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  userPost,
  usersGet,
  userGet,
  userPut,
  userDelete,
};
