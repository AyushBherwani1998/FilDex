export default function makeContract(web3, abi, address) {
  const contract = new web3.eth.Contract(abi, address);
  return contract;
}
