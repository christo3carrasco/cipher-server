const { request, response } = require("express");
const { generateUniqueVotingKey } = require("../helpers/gen-key");
const { Voter } = require("../models");

//votingKey
//POST
const voterPost = async (req = request, res = response) => {
  try {
    const { votingProcess, ...body } = req.body;
    const votingKey = await generateUniqueVotingKey(votingProcess);
    const voter = new Voter({ ...body, votingKey, votingProcess });
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
    const voters = await Voter.find();

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
