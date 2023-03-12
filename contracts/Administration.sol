// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Taxatation.sol";

contract Administration is Taxatation {
    constructor(address _samuraiAddress, address _conquestCoinAddress)
        Taxatation(_samuraiAddress, _conquestCoinAddress)
    {}

    struct Season {
        uint256 ID;
        uint256 startedTime;
    }

    uint256 seasonCount;

    mapping(uint256 => Season) public seasons;

    function startSeason() public {
        seasonCount++;
        Season memory season;
        season.ID = seasonCount;
        season.startedTime = block.timestamp;
        seasons[seasonCount] = season;
    }

    function addRoad(uint256 _id, uint8[] memory _roads) public {
        uint256 arrLength = _roads.length;
        for (uint256 i = 0; i < arrLength; i++) {
            lands[_id].roads.push(_roads[i]);
        }
    }

    function addLand(
        uint256 _id,
        uint256 _owner,
        uint256 _value,
        bool _isBase
    ) public {
        Land memory land;
        land.ID = _id;
        land.owner = _owner;
        land.value = _value;
        land.isBase = _isBase;
        lands[_id] = land;
    }

    function addSponsor(uint256 _id, string memory _uri) public {
        lands[_id].uri = _uri;
    }

    function endSeason() public {}

    function viewLeaderBoard() public {}
}
