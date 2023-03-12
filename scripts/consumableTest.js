
const hre = require("hardhat");
const fs = require('fs')
const config = require("../config.js")

async function main() {
    console.log(config.gameaddress)
    const gameContract = await ethers.getContractAt("Game", config.gameaddress);
    const playerData = await gameContract.viewLand(30);
    console.log(playerData);

}



main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
