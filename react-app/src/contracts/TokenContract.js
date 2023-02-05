import makeContract from "../utils/make_contract";
import FilDexConstants from "../Constants";

export default function makeTokenContract(
  web3,
  tokenAbi,
  tokenAddress,
  { name, logo }
) {
  const tokenContract = makeContract(web3, tokenAbi, tokenAddress);

  return Object.freeze({
    name,
    logo,
    contract: tokenContract,
    address: tokenAddress,
    abi: tokenAbi,
    approveContract,
    balanceOf,
    getAllowance,
  });

  async function approveContract(
    accountAddress,
    contractAddress,
    allowance = "100000000000000000000000"
  ) {
    const res = await tokenContract.methods
      .approve(contractAddress, FilDexConstants.allowance)
      .send({
        from: accountAddress,
        value: 0,
      });
    return res;
  }

  async function getAllowance(accountAddress, contractAddress) {
    var res;
    if(contractAddress === FilDexConstants.nativeContractAddress) {
      res = FilDexConstants.allowance;
    } else {
      res = await tokenContract.methods
      .allowance(accountAddress, contractAddress)
      .call();
    }
    return res;
  }

  async function balanceOf(accountAddress) {
    var res;
    if(tokenAddress === FilDexConstants.nativeContractAddress) {
      res = await web3.eth.getBalance(accountAddress);
    } else {
      res = await tokenContract.methods.balanceOf(accountAddress).call();
    }
    console.log(`address : ${accountAddress}, ${res}`)
    return Number(
      parseFloat(web3.utils.fromWei(res, "ether")).toFixed(3)
    ).toString();
  }
}
