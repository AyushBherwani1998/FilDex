import { ethers } from "hardhat";

const main = async () => {
  const FilDexLottery = await ethers.getContractFactory("FilDexLottery");


  let randomNumberGenerator;

  console.log("RandomNumberGenerator is deployed..");
  const RandomNumberGenerator = await ethers.getContractFactory("RandomNumberGenerator");

  randomNumberGenerator = await RandomNumberGenerator.deploy();

  await randomNumberGenerator.deployed();

  console.log("RandomNumberGenerator deployed to:", randomNumberGenerator.address);

  const filDexLottery = await FilDexLottery.deploy(
    "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33",
    randomNumberGenerator.address
  );

  await filDexLottery.deployed();
  console.log("FilDexLottery deployed to:", filDexLottery.address);

  // Set lottery address
  await randomNumberGenerator.setLotteryAddress(filDexLottery.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
