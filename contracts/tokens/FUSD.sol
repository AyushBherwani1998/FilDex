// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FUSDToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("FileUSD", "FUSD") {
        uint256 totalSupply = initialSupply * 10 ** 18;
        _mint(msg.sender, totalSupply);
    }
}