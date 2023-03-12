
const hre = require("hardhat");
const fs = require('fs')
const config = require("../config.js")

async function main() {
    console.log(config.gameaddress)
    const gameContract = await ethers.getContractAt("Game", config.gameaddress);
    await gameContract.addLand(1, 1, 5, true)
    await gameContract.addLand(2, 0, 5, false)
    await gameContract.addLand(3, 0, 5, false)
    await gameContract.addLand(4, 0, 5, false)
    await gameContract.addLand(5, 0, 5, false)
    await gameContract.addLand(6, 0, 5, false)
    await gameContract.addLand(7, 0, 5, false)
    await gameContract.addLand(8, 0, 5, false)
    await gameContract.addLand(9, 0, 5, false)
    await gameContract.addLand(10, 0, 5, false)
    await gameContract.addLand(11, 0, 5, false)
    await gameContract.addLand(12, 0, 5, false)
    await gameContract.addLand(13, 0, 5, false)
    await gameContract.addLand(14, 0, 5, false)
    await gameContract.addLand(15, 0, 5, false)
    await gameContract.addLand(16, 0, 5, false)
    await gameContract.addLand(17, 2, 5, true)
    await gameContract.addLand(18, 0, 5, false)
    await gameContract.addLand(19, 0, 5, false)
    await gameContract.addLand(20, 0, 5, false)
    await gameContract.addLand(21, 0, 5, false)
    await gameContract.addLand(22, 0, 5, false)
    await gameContract.addLand(23, 3, 5, true)
    await gameContract.addLand(24, 0, 5, false)
    await gameContract.addLand(25, 0, 5, false)
    await gameContract.addLand(26, 0, 5, false)
    await gameContract.addLand(27, 0, 5, false)
    await gameContract.addLand(28, 0, 5, false)
    await gameContract.addLand(29, 0, 5, false)
    await gameContract.addLand(31, 0, 5, false)
    await gameContract.addLand(32, 0, 5, false)
    await gameContract.addLand(33, 0, 5, false)
    await gameContract.addLand(34, 0, 5, false)
    await gameContract.addLand(35, 0, 5, false)
    await gameContract.addLand(36, 0, 5, false)
    await gameContract.addLand(37, 0, 5, false)
    await gameContract.addLand(38, 0, 5, false)
    await gameContract.addLand(39, 0, 5, false)
    console.log("lands were added");



    console.log("adding roads");
    let roads = [2, 8, 7, 28];
    await gameContract.addRoad(1, roads)

    roads = [3, 6, 8, 1];
    await gameContract.addRoad(2, roads)

    roads = [2, 4, 6];
    await gameContract.addRoad(3, roads)

    roads = [3, 6, 5];
    await gameContract.addRoad(4, roads)

    roads = [4, 6, 9, 10, 11];
    await gameContract.addRoad(5, roads)

    roads = [2, 3, 4, 5, 9, 8];
    await gameContract.addRoad(6, roads)

    roads = [1, 8, 15, 14, 13, 28];
    await gameContract.addRoad(7, roads)

    roads = [1, 2, 6, 9, 16, 15, 7];
    await gameContract.addRoad(8, roads)

    roads = [6, 5, 10, 16, 8];
    await gameContract.addRoad(9, roads)

    roads = [5, 9, 16, 11, 22];
    await gameContract.addRoad(10, roads)

    roads = [5, 10, 22, 23];
    await gameContract.addRoad(11, roads)

    roads = [28, 13, 18, 17];
    await gameContract.addRoad(12, roads)

    roads = [7, 14, 20, 19, 18, 12, 28];
    await gameContract.addRoad(13, roads)

    roads = [15, 21, 20, 13, 7];
    await gameContract.addRoad(14, roads)

    roads = [8, 16, 22, 21, 14, 7];
    await gameContract.addRoad(15, roads)

    roads = [8, 10, 22, 15, 9];
    await gameContract.addRoad(16, roads)

    roads = [12, 18, 30, 35];
    await gameContract.addRoad(17, roads)

    roads = [12, 13, 19, 24, 30, 17];
    await gameContract.addRoad(18, roads)

    roads = [13, 20, 26, 25, 24, 18];
    await gameContract.addRoad(19, roads)

    roads = [14, 21, 26, 19, 13];
    await gameContract.addRoad(20, roads)

    roads = [14, 15, 22, 26, 20];
    await gameContract.addRoad(21, roads)

    roads = [21, 15, 16, 10, 11, 23, 32, 27, 26];
    await gameContract.addRoad(22, roads)

    roads = [11, 22, 32, 29];
    await gameContract.addRoad(23, roads)

    roads = [19, 25, 31, 33, 30, 18];
    await gameContract.addRoad(24, roads)

    roads = [26, 27, 32, 31, 24, 19];
    await gameContract.addRoad(25, roads)

    roads = [21, 22, 27, 25, 19, 20];
    await gameContract.addRoad(26, roads)

    roads = [22, 32, 25, 26];
    await gameContract.addRoad(27, roads)

    roads = [1, 7, 13, 12];
    await gameContract.addRoad(28, roads)

    roads = [23, 32, 34, 36, 38];
    await gameContract.addRoad(29, roads)

    roads = [17, 18, 24, 33, 35];
    await gameContract.addRoad(30, roads)

    roads = [25, 24, 32, 34, 33];
    await gameContract.addRoad(31, roads)

    roads = [23, 22, 29, 34, 31, 25, 27];
    await gameContract.addRoad(32, roads)

    roads = [24, 31, 34, 36, 35, 30];
    await gameContract.addRoad(33, roads)

    roads = [32, 29, 36, 33, 31];
    await gameContract.addRoad(34, roads)

    roads = [30, 17, 33, 36, 37];
    await gameContract.addRoad(35, roads)

    roads = [29, 38, 35, 33, 34];
    await gameContract.addRoad(36, roads)

    roads = [35, 38, 39];
    await gameContract.addRoad(37, roads)

    roads = [29, 36, 39, 37];
    await gameContract.addRoad(38, roads)

    roads = [37, 38];
    await gameContract.addRoad(39, roads)




    console.log("roads were added");
    const landInfo = await gameContract.viewLand(19);
    console.log(landInfo)


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
