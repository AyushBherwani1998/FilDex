import Web3 from "web3";

export default function makeContract(provider, abi, address) {
  const web3 = new Web3(provider);

  const contract = new web3.eth.Contract(abi, address);
  return contract;
}