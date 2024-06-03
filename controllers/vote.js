const { request, response } = require("express");
const { Web3 } = require("web3");

const choiceContract = require("../public/assets/ChoiceContract.json");
const web3 = new Web3(process.env.NETWORK);

//PUT
const votePut = async (req = request, res = response) => {
  const { address, id } = req.params;

  try {
    const contract = new web3.eth.Contract(choiceContract.abi, address);
    const addresses = await web3.eth.getAccounts();

    await contract.methods
      .vote(id)
      .send({ from: addresses[0], gas: "3000000" });
    res.status(200).json({ msg: "Vote added successfully" });
  } catch (error) {
    res.status(400).json({
      msg: "No valid address",
      address,
    });
  }
};

module.exports = {
  votePut,
};
