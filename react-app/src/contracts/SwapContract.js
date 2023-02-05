import makeContract from "../utils/make_contract";

export default function makeSwapContract(web3, abi, address) {
  const swapContract = makeContract(web3, abi, address);

  return Object.freeze({
    contract: swapContract,
    getTokenAllowance,
    swapNativeToken,
    swapNonNativeToken,
    getNonNativeQuote,
  });

  async function getNonNativeQuote(
    fromAddress,
    toAddress,
    fromQty = "10000000000000"
  ) {
    const data = await swapContract.methods
      .getQuote(fromAddress, toAddress, web3.utils.toWei(fromQty, "ether"))
      .call();
    return Number(
      parseFloat(web3.utils.fromWei(data, "ether")).toFixed(3)
    ).toString();
  }

  async function getTokenAllowance(tokenAddress) {
    const data = await swapContract.methods.getAllowance(tokenAddress).call();
    return data;
  }

  async function swapNativeToken(
    accountAddress,
    toTokenAddress,
    nativeTokenAmount = "100000000000000"
  ) {
    const data = await swapContract.methods
      .swapNativeToken(toTokenAddress)
      .send({
        from: accountAddress,
        value: nativeTokenAmount,
      });

    return data;
  }

  async function swapNonNativeToken(
    accountAddress,
    fromTokenAddress,
    toTokenAddress,
    swapAmount = "10000000000000"
  ) {
    const data = await swapContract.methods
      .swapNonNativeToken(
        fromTokenAddress, // TT1
        toTokenAddress, // TT2
        swapAmount
      )
      .send({
        from: accountAddress,
        value: "0",
      });

    return data;
  }
}
