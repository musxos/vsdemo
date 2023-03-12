// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Conquest.sol";

contract Consumable is Conquest {
    constructor(address _samuraiAddress) Conquest(_samuraiAddress) {}

    struct Item {
        string name;
        uint256 ID;
        uint256 price;
    }

    mapping(uint256 => mapping(address => uint256)) public items;

    function buyItem(uint256 _id, uint256 _amount) public {}

    function useHealthPotion() public {
        require(balanceOf(msg.sender, 1) > 1, "you have not got this item"); //1
        players[msg.sender].isInjured = false;
    }

    function teleport(uint256 _newLocation) public {
        require(players[msg.sender].taxedGoods == 0);
        require(players[msg.sender].deployedTime == 0);
        require(lands[_newLocation].owner == players[msg.sender].clan);

        players[msg.sender].location = _newLocation;
    }

    function useKinjutsu(uint256 _nftID) public {
        require(balanceOf(msg.sender, 3) > 1, "you have not got this item"); //3

        samurai.kinjutsu(_nftID);
    }

    function balanceOf(address _user, uint256 _id)
        public
        view
        returns (uint256)
    {
        return items[_id][_user];
    }

    function viewUserInventory(address _userAddress)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory userItems = new uint256[](4);
        for (uint256 i = 1; i < 4; i++) {
            userItems[i] = (balanceOf(_userAddress, i));
        }
        return userItems;
    }
}
