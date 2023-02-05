import { ethers } from "hardhat";
import { filDexLotteryContractAddress } from "../config";

const main = async () => {
    const filDexLottery = await ethers.getContractAt("FilDexLottery", filDexLotteryContractAddress);
    let lotteryId = await filDexLottery.currentLotteryId();

    let closeLotteryTransaction = await filDexLottery.closeLottery(lotteryId);
    let receipt = await closeLotteryTransaction.wait(1);
    if (receipt.status === 1) {
        console.log("Lottery is closed now: ");
        console.log(closeLotteryTransaction.hash);


        let drawLotteryTransaction = await filDexLottery.drawFinalNumberAndMakeLotteryClaimable(lotteryId, true);
        let drawReceiptTransactionReceipt = await closeLotteryTransaction.wait(1);
        if (receipt.status === 1) {
            console.log("Lottery is claimable now: ");
            console.log(drawLotteryTransaction.hash);
        } else {
            console.log("Failed to draw lottery: ");
            console.log(drawLotteryTransaction.hash);
        }
    } else {
        console.log("Failed to close lottery: ");
        console.log(closeLotteryTransaction.hash);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
