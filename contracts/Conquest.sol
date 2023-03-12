// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./DeckSystem.sol";

contract Conquest is DeckSystem {
    //günün belli saatlerinde hareket hızı çok hızlansın
    //günün belli saatlerinde belli bir kullanıcı sayısına ulaşılan topraklarda savaş kullanıcılar tarafından başlatılabilsin.

    constructor(address _samuraiAddress) DeckSystem(_samuraiAddress) {}

    struct Land {
        //başta girilecek
        uint256 ID;
        string uri;
        uint256 owner;
        uint256 value;
        uint8[] roads;
        bool isBase;
        //savaş bilgileri
        uint256 attackerClan;
        address[] defenderWarriors; //1
        address[] attackerWarriors; //2
    }

    mapping(uint256 => Land) public lands;

    function deployInLand() public {
        require(
            players[msg.sender].deployedTime == 0,
            "you are already deployed"
        );
        require(
            players[msg.sender].isInjured == false,
            "your warriors are tired"
        );
        require(
            players[msg.sender].currentDeck.length == 3,
            "you don't have any troops to deploy"
        );
        uint256 currentLocation = players[msg.sender].location;
        if (lands[currentLocation].attackerClan == 0) {
            lands[currentLocation].attackerClan = players[msg.sender].clan;
        }
        if (players[msg.sender].clan == ownerOfLand(currentLocation)) {
            lands[currentLocation].defenderWarriors.push(msg.sender);
            players[msg.sender].deployedTime = 0;
        } else {
            if (
                lands[currentLocation].attackerClan == players[msg.sender].clan
            ) {
                lands[currentLocation].attackerWarriors.push(msg.sender);
                players[msg.sender].deployedTime = block.timestamp;
            } else {
                revert("cannot deploy here");
            }
        }
    }

    function Doom() public {
        for (uint256 i = 1; i < 40; i++) {
            if (lands[i].attackerWarriors.length > 0) {
                startWar(i);
            }
        }
    }

    function startWar(uint256 _id) public {
        uint256 defenderCount = lands[_id].defenderWarriors.length;
        uint256 attackerCount = lands[_id].attackerWarriors.length;
        uint256 attackerPower = 0;
        uint256 defenderPower = 0;
        if (defenderCount == 0) {
            lands[_id].owner = players[lands[_id].attackerWarriors[0]].clan;
            for (uint256 i = 0; i < attackerCount; i++) {
                players[lands[_id].attackerWarriors[i]].isInjured = true;
                players[lands[_id].attackerWarriors[i]].deployedTime = 0;
            }
            delete lands[_id].attackerWarriors;
            lands[_id].attackerClan = 0;
            return;
        }
        for (uint256 i = 0; i < defenderCount; i++) {
            for (uint256 j = 0; j < 3; j++) {
                defenderPower += samurai
                    .viewHero(
                        players[lands[_id].defenderWarriors[i]].currentDeck[j]
                    )
                    .defence;
            }
            players[lands[_id].defenderWarriors[i]].isInjured = true;
            players[lands[_id].defenderWarriors[i]].deployedTime = 0;
        }
        for (uint256 i = 0; i < attackerCount; i++) {
            for (uint256 j = 0; j < 3; j++) {
                attackerPower += samurai
                    .viewHero(
                        players[lands[_id].attackerWarriors[i]].currentDeck[j]
                    )
                    .attack;
            }
            players[lands[_id].attackerWarriors[i]].isInjured = true;
            players[lands[_id].attackerWarriors[i]].deployedTime = 0;
            delete lands[_id].attackerWarriors;
            delete lands[_id].defenderWarriors;
            lands[_id].attackerClan = 0;
        }
        if (attackerPower > defenderPower) {
            lands[_id].owner = players[lands[_id].attackerWarriors[0]].clan;
            lands[_id].attackerClan = 0;
        }
    }

    function changeLocation(uint256 target) public {
        require(players[msg.sender].locationChangedTime + 10 < block.timestamp);
        require(
            players[msg.sender].deployedTime == 0,
            "you have been in Attack"
        );

        uint8[] memory targetDirecitons = lands[target].roads;

        for (uint256 i = 0; i < targetDirecitons.length; i++) {
            if (targetDirecitons[i] == players[msg.sender].location) {
                if (
                    lands[players[msg.sender].location].owner ==
                    players[msg.sender].clan ||
                    lands[target].owner == players[msg.sender].clan
                ) {
                    players[msg.sender].locationChangedTime = block.timestamp;
                    players[msg.sender].location = target;
                    return;
                }
            }
        }
        revert("invalid direction");
    }

    function healSamurai() public {
        require(lands[players[msg.sender].location].isBase == true);
        players[msg.sender].isInjured = false;
    }

    function buildBase(uint256 _id) public {
        //dao kararı olsun
        require(lands[_id].owner == players[msg.sender].clan);
        lands[_id].isBase = true;
    }

    function viewAllLands() public view returns (Land[] memory) {
        Land[] memory landArray = new Land[](39);
        for (uint256 i = 1; i < 40; i++) {
            landArray[i] = lands[i];
        }
        return landArray;
    }

    function ownerOfLand(uint256 _id) public view returns (uint256) {
        return lands[_id].owner;
    }

    function viewLandOwners() public view returns (uint256[] memory) {
        uint256[] memory _landOwners = new uint256[](40);
        for (uint256 i = 1; i < 40; i++) {
            _landOwners[i] = ownerOfLand(i);
        }
        return _landOwners;
    }

    function viewAttackers(uint256 _id) public view returns (address[] memory) {
        return lands[_id].attackerWarriors;
    }

    function viewDefenders(uint256 _id) public view returns (address[] memory) {
        return lands[_id].defenderWarriors;
    }

    function viewLand(uint256 _id) public view returns (Land memory) {
        return lands[_id];
    }

    function viewOneDefendersPower(address _defenderAddress)
        public
        view
        returns (uint256)
    {
        uint256 defenderPower;
        for (uint256 j = 0; j < 3; j++) {
            defenderPower += samurai
                .viewHero(players[_defenderAddress].currentDeck[j])
                .defence;
        }
        return defenderPower;
    }

    function viewAllDefendersPower(uint256 _id) public view returns (uint256) {
        uint256 defenderCount = lands[_id].defenderWarriors.length;
        uint256 defenderPower;
        for (uint256 i = 0; i < defenderCount; i++) {
            defenderPower += viewOneDefendersPower(
                lands[_id].defenderWarriors[i]
            );
        }
        return defenderPower;
    }

    function viewOneAttackersPower(address _attackerAddress)
        public
        view
        returns (uint256)
    {
        uint256 attackerPower;
        for (uint256 j = 0; j < 3; j++) {
            attackerPower += samurai
                .viewHero(players[_attackerAddress].currentDeck[j])
                .attack;
        }
        return attackerPower;
    }

    function viewAllAttackersPower(uint256 _id) public view returns (uint256) {
        uint256 attackerCount = lands[_id].attackerWarriors.length;
        uint256 attackerPower;
        for (uint256 i = 0; i < attackerCount; i++) {
            attackerPower += viewOneAttackersPower(
                lands[_id].attackerWarriors[i]
            );
        }
        return attackerPower;
    }
}
