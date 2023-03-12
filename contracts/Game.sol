// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Samurai.sol";
import "./Administration.sol";
import "./Taxatation.sol";

contract Game is Administration {
    constructor(address _samuraiAddress, address _conquestCoinAddress)
        Administration(_samuraiAddress, _conquestCoinAddress)
    {
        startSeason();
    }
}
