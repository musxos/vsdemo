
const hre = require("hardhat");
const fs = require('fs')
const config = require("../config.js")

async function main() {
    console.log(config.gameaddress)
    const gameContract = await ethers.getContractAt("Game", config.gameaddress);
    await gameContract.Doom()
    console.log("war has ended");

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
