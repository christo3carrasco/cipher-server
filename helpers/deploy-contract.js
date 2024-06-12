const { Web3 } = require("web3");
const choiceContract = require("../public/assets/ChoiceContract.json");

const web3 = new Web3(process.env.NETWORK);

const deployContract = async () => {
  const accounts = await web3.eth.getAccounts();
  const deployedContract = new web3.eth.Contract(choiceContract.abi);

  const result = await deployedContract
    .deploy({ data: choiceContract.bytecode })
    .send({ from: accounts[0], gas: "3000000" });

  return result.options.address;
};

module.exports = deployContract;
