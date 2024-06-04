const { request, response } = require("express");
const { Web3 } = require("web3");

const { Vote, Voting } = require("../models");

const choiceContract = require("../public/assets/ChoiceContract.json");
const web3 = new Web3(process.env.NETWORK);

//POST
const votePost = async (req = request, res = response) => {
  const { votingId, voterId, option } = req.params;

  try {
    const existingVote = await Vote.findOne({ voter: voterId });
    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: "Voter already vote",
      });
    }

    const voting = await Voting.findById(votingId);
    const address = voting.contractAddress;

    const contract = new web3.eth.Contract(choiceContract.abi, address);
    const addresses = await web3.eth.getAccounts();

    await contract.methods
      .vote(option)
      .send({ from: addresses[0], gas: "3000000" });

    const vote = new Vote({ voter: voterId, optionNumber: option });
    await vote.save();

    res.status(201).json({
      success: true,
      message: "Vote created successfully",
      vote,
    });
  } catch (error) {
    console.error("Error creating vote", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//GET
const votesGet = async (req = request, res = response) => {
  try {
    const votes = await Vote.find();

    if (!votes || votes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No votes found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Votes found successfully",
      votes,
    });
  } catch (error) {
    console.error("Error fetching votes:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//GET
const voteGet = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const vote = await Vote.findById(id);

    return res.status(200).json({
      success: true,
      message: "Vote found successfully",
      vote,
    });
  } catch (error) {
    console.error("Error fetching vote by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  votePost,
  votesGet,
  voteGet,
};
