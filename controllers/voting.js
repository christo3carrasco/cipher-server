const { request, response } = require("express");
const { Voting } = require("../models");

//POST
const votingPost = async (req = request, res = response) => {
  try {
    const { ...body } = req.body;
    const voting = new Voting({ ...body });
    await voting.save();

    res.status(201).json({
      success: true,
      message: "Voting created successfully",
      voting,
    });
  } catch (error) {
    console.error("Error creating voting:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//GET
const votingsGet = async (req = request, res = response) => {
  try {
    const { status } = req.query;

    const filters = {};

    if (status) {
      filters.status = status;
    }

    const votings = await Voting.find(filters);

    if (!votings || votings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No votings found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Votings found successfully",
      votings,
    });
  } catch (error) {
    console.error("Error fetching votings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//GET
const votingGet = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const voting = await Voting.findById(id);

    return res.status(200).json({
      success: true,
      message: "Voting found successfully",
      voting,
    });
  } catch (error) {
    console.error("Error fetching voting by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//PUT
const votingPut = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    let voting = await Voting.findById(id);
    voting.set(req.body);
    await voting.save();

    return res.status(200).json({
      success: true,
      message: "Voting updated successfully",
      voting,
    });
  } catch (error) {
    console.error("Error updating voting:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//DELETE
const votingDelete = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const voting = await Voting.findById(id);
    voting.status = false;
    await voting.save();

    return res.status(200).json({
      success: true,
      message: "Voting deleted successfully",
      voting,
    });
  } catch (error) {
    console.error("Error deleting voting:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  votingPost,
  votingsGet,
  votingGet,
  votingPut,
  votingDelete,
};
