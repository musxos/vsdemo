require("@nomicfoundation/hardhat-toolbox");
const { mnemonic } = require("./secrets.json");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      from: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // want this contract owner
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
    },
  },
  solidity: "0.8.17",
};
