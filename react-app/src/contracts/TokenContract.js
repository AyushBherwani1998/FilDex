import makeContract from "../utils/make_contract";

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
    allowance = "10000000000000"
  ) {
    const res = await tokenContract.methods
      .approve(contractAddress, allowance)
      .send({
        from: accountAddress,
        value: 0,
      });
    return res;
  }

  async function getAllowance(accountAddress, contractAddress) {
    const res = await tokenContract.methods
      .allowance(accountAddress, contractAddress)
      .call();
    return res;
  }

  async function balanceOf(accountAddress) {
    const res = await tokenContract.methods.balanceOf(accountAddress).call();
    return Number(
      parseFloat(web3.utils.fromWei(res, "ether")).toFixed(3)
    ).toString();
  }
}
