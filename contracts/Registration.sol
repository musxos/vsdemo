// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Registration {
    struct Player {
        uint256 ID;
        string uri;
        uint256 clan;
        uint256 seasonPoint;
        uint256[] currentDeck;
        uint256 location;
        uint256 locationChangedTime;
        uint256 taxedGoods;
        uint256 deployedTime;
        bool isInjured;
    }

    mapping(address => Player) internal players;
    mapping(address => mapping(uint256 => uint256)) lastTaxatationTime;

    uint256 playerCount = 0;

    function register(string memory _uri) external {
        // kayıt oluş sırasında 3 karta sahip olmak zorunlu olsun mu?
        require(players[msg.sender].ID == 0, "you are already registered");

        uint256 _clanId = rand(1, 3);

        Player storage player = players[msg.sender];
        playerCount++;
        player.ID = playerCount;
        player.uri = _uri;
        player.clan = _clanId;
        if (_clanId == 1) {
            player.location = 1;
        } else if (_clanId == 2) {
            player.location = 17;
        } else if (_clanId == 3) {
            player.location = 23;
        }
    }

    function viewPlayer(address _playerAddress)
        public
        view
        returns (Player memory)
    {
        return (players[_playerAddress]);
    }

    function rand(uint8 minLimit, uint8 maxLimit) private view returns (uint8) {
        return
            (uint8(
                uint256(
                    keccak256(abi.encodePacked(block.timestamp, msg.sender))
                )
            ) % maxLimit) + minLimit;
    }

    modifier mustBeRegistered() {
        require(players[msg.sender].ID != 0);
        _;
    }
}
