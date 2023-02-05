import { ethers } from "hardhat";
import { filDexLotteryContractAddress } from "../config";

const main = async () => {
    const filDexLottery = await ethers.getContractAt("FilDexLottery", filDexLotteryContractAddress);
    let lotteryId = await filDexLottery.currentLotteryId();

    let transaction = await filDexLottery.closeLottery(lotteryId);
    console.log("Lottery is closed now: ")
    console.log(transaction.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
