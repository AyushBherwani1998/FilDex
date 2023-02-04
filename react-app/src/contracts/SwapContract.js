import makeContract from "../utils/make_contract";

export default function makeSwapContract(web3, abi, address) {
  const swapContract = makeContract(web3, abi, address);

  return Object.freeze({
    contract: swapContract,
    getTokenAllowance,
    swapNativeToken,
    swapNonNativeToken,
  });

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
