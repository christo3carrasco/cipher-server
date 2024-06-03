const { request, response } = require("express");
const { Web3 } = require("web3");

const choiceContract = require("../public/assets/ChoiceContract.json");
const web3 = new Web3(process.env.NETWORK);

//GET
const optionGet = async (req = request, res = response) => {
  const { address } = req.params;

  try {
    const contract = new web3.eth.Contract(choiceContract.abi, address);

    const details = [];
    const count = await contract.methods.getOptionCount().call();

    for (let i = 1; i <= count; i++) {
      const id = i;
      const name = await contract.methods.getOptionName(i).call();
      const count = await contract.methods.getVoteCount(i).call();
      details.push({ id: id, name: name, voteCount: Number(count) });
    }
    res.status(200).json(details);
  } catch (error) {
    res.status(400).json({
      msg: "No valid address",
      address,
    });
  }
};

//POST
const optionPost = async (req = request, res = response) => {
  const { address } = req.params;
  const { name } = req.body;

  try {
    const contract = new web3.eth.Contract(choiceContract.abi, address);
    const addresses = await web3.eth.getAccounts();

    await contract.methods
      .addOption(name)
      .send({ from: addresses[0], gas: "3000000" });
    res.status(200).json({ msg: "Option added successfully", name });
  } catch (error) {
    res.status(400).json({
      msg: "No valid address",
      address,
    });
  }
};

module.exports = {
  optionGet,
  optionPost,
};
