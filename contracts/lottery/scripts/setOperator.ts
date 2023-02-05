import { ethers } from "hardhat";
import { filDexContractAddress, injectorAddress, operatorAddress, tresuaryAddress } from "../config";

const main = async () => {
    const filDexLottery = await ethers.getContractAt("FilDexLottery", filDexContractAddress);
    const transaction = await filDexLottery.setOperatorAndTreasuryAndInjectorAddresses(operatorAddress, tresuaryAddress, injectorAddress);
    console.log(transaction.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
