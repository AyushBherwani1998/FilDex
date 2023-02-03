import Web3 from "web3";
import swapABI from "./abi/SwapABI";

export default function makeSwapContract(provider) {
  const web3 = new Web3(provider);

  const swapContract = new web3.eth.Contract(swapABI.abi, swapABI.address);
  return swapContract;
}
