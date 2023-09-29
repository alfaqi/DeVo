require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SWISSTRONIK_API_KEY = process.env.SWISSTRONIK_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // url: "http://127.0.0.1:8545",
      chainId: 31337,
      blockConfirmations: 1,
    },
    swisstronik: {
      url: SWISSTRONIK_API_KEY,
      accounts: [PRIVATE_KEY],
    },
  },
};
