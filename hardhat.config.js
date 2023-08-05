require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    local: {
      url: "HTTP://127.0.0.1:8545",
      accounts: "remote",
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s2.binance.org:8545/",
      chainId: 97,
      accounts: [process.env.PRI_KEY],
    },
    mainnet: {
      url: "https://rpc.ankr.com/bsc",
      chainId: 56,
      accounts: [process.env.PRI_KEY],
    },
    opbnbtestnet: {
      url: "https://opbnb-testnet-rpc.bnbchain.org/",
      chainId: 5611,
      accounts: [process.env.PRI_KEY],
      gasPrice: 50000000000,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: [process.env.BSC_SCAN_API_KEY],
      testnet: [process.env.BSC_SCAN_API_KEY],
      local: " ",
    },
    customChains: [
      {
        network: "mainnet",
        chainId: 56,
        urls: {
          apiURL: "https://api.bscscan.com/api",
          browserURL: "https://bscscan.com/",
        },
      },
      {
        network: "testnet",
        chainId: 97,
        urls: {
          apiURL: "https://api.testnet.bscscan.com/api",
          browserURL: "https://testnet.bscscan.com/",
        },
      },
      {
        network: "local",
        chainId: 1337,
        urls: {
          apiURL: "http://localhost:4000/api",
          browserURL: "http://localhost:4000",
        },
      },
    ],
  },
};
