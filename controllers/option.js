const { request, response } = require("express");
const { Web3 } = require("web3");

const { Voting } = require("../models");

const choiceContract = require("../public/assets/ChoiceContract.json");
const web3 = new Web3(process.env.NETWORK);

//GET
const optionGet = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const voting = await Voting.findById(id);
    const address = voting.contractAddress;

    const contract = new web3.eth.Contract(choiceContract.abi, address);

    const details = [];
    const count = await contract.methods.getOptionCount().call();

    for (let i = 1; i <= count; i++) {
      const id = i;
      const name = await contract.methods.getOptionName(i).call();
      const count = await contract.methods.getVoteCount(i).call();
      details.push({ id: id, name: name, voteCount: Number(count) });
    }

    if (!details || details.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No options found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Options found successfully",
      details,
    });
  } catch (error) {
    console.error("Error fetching options:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//POST
const optionPost = async (req = request, res = response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const voting = await Voting.findById(id);
    const address = voting.contractAddress;

    const contract = new web3.eth.Contract(choiceContract.abi, address);

    const count = await contract.methods.getOptionCount().call();

    for (let i = 1; i <= count; i++) {
      const existingName = await contract.methods.getOptionName(i).call();
      if (existingName.toLowerCase() === name.toLowerCase()) {
        return res.status(400).json({
          success: false,
          message: "Option name already exists",
        });
      }
    }

    const addresses = await web3.eth.getAccounts();

    await contract.methods
      .addOption(name)
      .send({ from: addresses[0], gas: "3000000" });

    res.status(201).json({
      success: true,
      message: "Option created successfully",
      name,
    });
  } catch (error) {
    console.error("Error creating option:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  optionGet,
  optionPost,
};
