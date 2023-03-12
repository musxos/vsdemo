// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Registration.sol";
import "./Samurai.sol";

contract DeckSystem is Registration {
    Samurai public samurai;

    constructor(address _samuraiAddress) {
        samurai = Samurai(_samuraiAddress);
    }

    function setDeck(uint256[3] memory _heroes) external mustBeRegistered {
        require(
            samurai.ownerOf(_heroes[0]) == msg.sender &&
                samurai.ownerOf(_heroes[1]) == msg.sender &&
                samurai.ownerOf(_heroes[2]) == msg.sender,
            "you are not the owner"
        );
        players[msg.sender].currentDeck = _heroes;
    }

    function viewHeroes(address _owner) public view returns (uint256[] memory) {
        uint256 totalSupply = samurai.totalSupply();
        uint256 userHeroCount = samurai.balanceOf(_owner);
        uint256[] memory userNFTs = new uint256[](userHeroCount);
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= totalSupply; i++) {
            if (samurai.ownerOf(i) == _owner) {
                userNFTs[currentIndex] = i;
                currentIndex++;
            }
        }
        return userNFTs;
    }

    function viewCurrentDeck(address _playerAddress)
        public
        view
        returns (uint256[] memory)
    {
        return players[_playerAddress].currentDeck;
    }
}
