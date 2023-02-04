import makeContract from "../utils/make_contract";

export default function makeTokenContract(web3, tokenAbi, tokenAddress) {
  const tokenContract = makeContract(web3, tokenAbi, tokenAddress);

  return Object.freeze({
    contract: tokenContract,
    address: tokenAddress,
    abi: tokenAbi,
    approveContract,
  });

  async function approveContract(
    accountAddress,
    contractAddress,
    allowance = "10000000000000"
  ) {
    const res = await tokenContract.methods
      .approve(contractAddress, contractAddress, allowance)
      .send({
        from: accountAddress,
        value: 0,
      });
    return res;
  }
}
