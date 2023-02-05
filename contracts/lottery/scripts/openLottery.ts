import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { filDexLotteryContractAddress } from "../config";

const main = async () => {
    const filDexLottery = await ethers.getContractAt("FilDexLottery", filDexLotteryContractAddress);
    let date = new Date();
    // 5 minutes 
    date.setMinutes(date.getMinutes() + 5);
    let resolvedEndTime = Math.floor(date.getTime() / 1000)

    let priceInFDex = parseEther("1");

    // bracket breakdown of the prices
    const newRewardsBreakdown = ["200", "500", "1000", "2000", "2500", "3800"];

    // treasuryFee to be collected
    const _treasuryFee = "2000";

    let transaction = await filDexLottery.startLottery(resolvedEndTime, priceInFDex, "0", newRewardsBreakdown, _treasuryFee);
    console.log("Lottery is open now: ")
    console.log(transaction.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
