const { Role, User, Vote, Voter, Voting } = require("../models");

const roleExists = async (role = "USER_ROLE") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`Role: ${role}, no exists`);
  }
};

const emailExists = async (email = "") => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error(`Email: ${email}, exists`);
  }
};

const userIdExists = async (id) => {
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`ID: ${id}, no exists`);
  }
};

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
  roleExists,
  emailExists,
  userIdExists,
  voteIdExists,
  voterIdExists,
  votingIdExists,
};
