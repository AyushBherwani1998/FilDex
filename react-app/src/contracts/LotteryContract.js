import makeContract from "../utils/make_contract";


export default function makeLotteryContract(web3, abi, address) {
  const lotteryContract = makeContract(web3, abi, address);


  return Object.freeze({
    contract: lotteryContract,
    address,
    viewCurrentLotteryId,
    viewUserInfoForLotteryId,
    viewLottery,
    buyTickets,
  });

  async function buyTickets(account, lotteryId, ticketNumber) {
    const data = await lotteryContract.methods
      .buyTickets(lotteryId, ticketNumber)
      .send({
        from: account,
        value: "0",
      });
    console.log("Buy Tickets");
    console.log(data);
    return data;
  }

  async function viewCurrentLotteryId() {
    const data = await lotteryContract.methods.viewCurrentLotteryId().call();
    console.log("Lottery Id");
    console.log(data);
    return data;
  }

  async function viewUserInfoForLotteryId(account, lotteryId) {
    const data = await lotteryContract.methods
      .viewUserInfoForLotteryId(account, lotteryId, "0", "25")
      .call();
    console.log("User Data");
    console.log(data);
    return data;
  }

  async function viewLottery(lotteryId) {
    const data = await lotteryContract.methods.viewLottery(lotteryId).call();
    console.log("Lottery Data");
    console.log(data);
    return data;
  }
}
