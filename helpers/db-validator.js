const { Vote, Voter, Voting } = require("../models");

const voteIdExists = async (id) => {
  const existsVote = await Vote.findById(id);
  if (!existsVote) {
    throw new Error(`ID: ${id}, no exists`);
  }
};

const voterIdExists = async (id) => {
  const existsVoter = await Voter.findById(id);
  if (!existsVoter) {
    throw new Error(`ID: ${id}, no exists`);
  }
};

const votingIdExists = async (id) => {
  const existsVoting = await Voting.findById(id);
  if (!existsVoting) {
    throw new Error(`ID: ${id}, no exists`);
  }
};

module.exports = {
  voteIdExists,
  voterIdExists,
  votingIdExists,
};
