const { request, response } = require("express");
const { Voter } = require("../models");

//POST
const voterPost = async (req = request, res = response) => {
  try {
    const { ...body } = req.body;
    const voter = new Voter({ ...body });
    await voter.save();

    res.status(201).json({
      success: true,
      message: "Voter created successfully",
      voter,
    });
  } catch (error) {
    console.error("Error creating voter:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//GET
const votersGet = async (req = request, res = response) => {
  try {
    const { user, hasVoted, votingProcess, status } = req.query;

    const filters = {};

    if (user) {
      filters.user = user;
    }

    if (hasVoted) {
      filters.hasVoted = hasVoted;
    }

    if (votingProcess) {
      filters.votingProcess = votingProcess;
    }

    if (status) {
      filters.status = status;
    }

    const voters = await Voter.find(filters);

    if (!voters || voters.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No voters found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Voters found successfully",
      voters,
    });
  } catch (error) {
    console.error("Error fetching voters:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//GET
const voterGet = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const voter = await Voter.findById(id);

    return res.status(200).json({
      success: true,
      message: "Voter found successfully",
      voter,
    });
  } catch (error) {
    console.error("Error fetching voter by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//PUT
const voterPut = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    let voter = await Voter.findById(id);
    voter.set(req.body);
    await voter.save();

    return res.status(200).json({
      success: true,
      message: "Voter updated successfully",
      voter,
    });
  } catch (error) {
    console.error("Error updating voter:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//DELETE
const voterDelete = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const voter = await Voter.findById(id);
    voter.status = false;
    await voter.save();

    return res.status(200).json({
      success: true,
      message: "Voter deleted successfully",
      voter,
    });
  } catch (error) {
    console.error("Error deleting voter:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  voterPost,
  votersGet,
  voterGet,
  voterPut,
  voterDelete,
};
