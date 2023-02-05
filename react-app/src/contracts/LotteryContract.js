import makeContract from "../utils/make_contract";
import makeTokenContract from "./TokenContract";
import erc20ABI from "../abi/ERC20ABI";

const fDexTokenAddress = "0x4cC33BD5d61791aC58a43A4f645256E7cc75ED1c";

export default function makeLotteryContract(web3, abi, address) {
  const lotteryContract = makeContract(web3, abi, address);

  const fDexToken = makeTokenContract(web3, erc20ABI.abi, fDexTokenAddress);

  return Object.freeze({
    fDexToken,
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
