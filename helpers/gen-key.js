const { Voter } = require("../models");

const generateUniqueCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const isCodeUnique = async (code, votingProcess) => {
  const existingVoter = await Voter.findOne({ votingKey: code, votingProcess });
  return !existingVoter;
};

const generateUniqueVotingKey = async (votingProcess) => {
  let code = generateUniqueCode();
  while (!(await isCodeUnique(code, votingProcess))) {
    code = generateUniqueCode();
  }
  return code;
};

module.exports = { generateUniqueVotingKey };
