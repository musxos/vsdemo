// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Conquest.sol";
import "./ConquestCoin.sol";
import "./Consumable.sol";

contract Taxatation is Consumable {
    ConquestCoin conquestCoin;

    constructor(address _samuraiAddress, address _conquestCoinAddress)
        Consumable(_samuraiAddress)
    {
        conquestCoin = ConquestCoin(_conquestCoinAddress);
    }

    function collectTax() public {
        uint256 currentCity = players[msg.sender].location;
        require(
            players[msg.sender].clan == lands[currentCity].owner,
            "this land is not yours"
        );
        require(
            lastTaxatationTime[msg.sender][currentCity] + 24 hours <=
                block.timestamp,
            "already collected"
        );
        require(
            players[msg.sender].isInjured == false,
            "your samurai are tired"
        );
        require(
            lands[currentCity].isBase == false,
            "you cannot collect taxes here"
        );

        uint256 playerPower;

        for (uint256 i = 0; i < 3; i++) {
            playerPower += samurai
                .viewHero(viewCurrentDeck(msg.sender)[i])
                .attack;
        }
        lastTaxatationTime[msg.sender][currentCity] = block.timestamp;

        players[msg.sender].taxedGoods +=
            playerPower +
            lands[currentCity].value;
    }

    function sellGoods() public {
        uint256 currentCity = players[msg.sender].location;
        require(lands[currentCity].isBase);
        require(lands[currentCity].owner == players[msg.sender].clan);
        uint256 goods = players[msg.sender].taxedGoods;
        players[msg.sender].taxedGoods = 0;
        conquestCoin.mint(msg.sender, 200 * goods);
    }
}
