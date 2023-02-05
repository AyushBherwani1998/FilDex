// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IRandomNumberGenerator.sol";
import "./interfaces/IFilDexLottery.sol";

contract RandomNumberGenerator is IRandomNumberGenerator, Ownable {
    address public filDexLottery;
    uint32 public randomResult;
    uint256 public latestLotteryId;

    function getRandomNumber(uint256 _seed) external override {
        require(msg.sender == filDexLottery, "Only FilDexLottery allowed");
        uint256 randomness = random(_seed);
        fulfillRandomness(randomness);
    }

    function random(uint256 _seed) private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        _seed
                    )
                )
            );
    }

    /**
     * @notice Set the address for the PancakeSwapLottery
     * @param _filDexLottery: address of the PancakeSwap lottery
     */
    function setLotteryAddress(address _filDexLottery) external onlyOwner {
        filDexLottery = _filDexLottery;
    }

    function fulfillRandomness(uint256 randomness) internal {
        randomResult = uint32(1000000 + (randomness % 1000000));
        latestLotteryId = IFilDexLottery(filDexLottery).viewCurrentLotteryId();
    }

    /**
     * @notice View latestLotteryId
     */
    function viewLatestLotteryId() external view override returns (uint256) {
        return latestLotteryId;
    }

    /**
     * @notice View random result
     */
    function viewRandomResult() external view override returns (uint32) {
        return randomResult;
    }
}
