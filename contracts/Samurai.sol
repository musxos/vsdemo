// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Samurai is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    struct Hero {
        uint256 ID;
        uint8 attack;
        uint8 defence;
        uint8 manaCost;
    }

    mapping(uint256 => Hero) public idToSamurai;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Samurai", "SMRAI") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        (uint8 attack, uint8 defence, uint8 manaCost) = getPowers();
        idToSamurai[tokenId] = Hero(tokenId, attack, defence, manaCost);
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function kinjutsu(uint256 _ID) external onlyOwner {
        idToSamurai[_ID].attack--;
        idToSamurai[_ID].defence--;
        idToSamurai[_ID].attack--;
    }

    function viewHero(uint256 _id) public view returns (Hero memory) {
        return idToSamurai[_id];
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function rand(uint8 range) private view returns (uint8) {
        return
            uint8(
                uint256(
                    keccak256(abi.encodePacked(block.timestamp, msg.sender))
                )
            ) % range;
    }

    function getPowers()
        private
        view
        returns (
            uint8,
            uint8,
            uint8
        )
    {
        uint256 heroCount = _tokenIdCounter.current();
        return (
            uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            msg.sender,
                            heroCount,
                            block.difficulty,
                            "attack"
                        )
                    )
                )
            ) % 10,
            uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            msg.sender,
                            heroCount,
                            block.timestamp,
                            "defence"
                        )
                    )
                )
            ) % 10,
            uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            msg.sender,
                            heroCount,
                            block.timestamp,
                            "mana cost"
                        )
                    )
                )
            ) % 10
        );
    }
}
