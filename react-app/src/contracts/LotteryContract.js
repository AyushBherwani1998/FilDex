import makeContract from "../utils/make_contract";

export default function makeLotteryContract(web3, abi, address) {
  const lotteryContract = makeContract(web3, abi, address);

  return Object.freeze({
    contract: lotteryContract,
    address,
    viewCurrentLotteryId,
    viewUserInfoForLotteryId,
  });

  async function viewCurrentLotteryId() {
    const data = await lotteryContract.methods.viewCurrentLotteryId().call();
    console.log("Lottery Id");
    console.log(data);
    return data;
  }

  async function viewUserInfoForLotteryId(account, lotteryId) {
    const data = await lotteryContract.methods.viewUserInfoForLotteryId(
      account,
      lotteryId,
      "0",
      "25"
    );

    console.log("User Data");
    console.log(data);
    return data;
  }
}
