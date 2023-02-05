import makeContract from '../utils/make_contract'
import sendNotification from '../push/send_notification';

export default function makeSwapContract(web3, abi, address) {
  const swapContract = makeContract(web3, abi, address)

  return Object.freeze({
    contract: swapContract,
    getTokenAllowance,
    swapNativeToken,
    swapNonNativeToken,
    getNonNativeQuote,
    getNativeQuote,
    addNonNativeTokenLiquidity,
    addNativeTokenLiquidity
  })

  async function getNativeQuote(
    toAddress,
    fromQty
  ) {
    const data = await swapContract.methods
      .getNativeQuote(toAddress, web3.utils.toWei(fromQty, 'ether'))
      .call()
    return Number(
      parseFloat(web3.utils.fromWei(data, 'ether')).toFixed(3)
    ).toString()
  }

  async function getNonNativeQuote(
    fromAddress,
    toAddress,
    fromQty
  ) {
    console.log(fromQty);
    console.log(web3.utils.toWei(fromQty, 'ether'))
    const data = await swapContract.methods
      .getQuote(fromAddress, toAddress, web3.utils.toWei(fromQty, 'ether'))
      .call()
    return Number(
      parseFloat(web3.utils.fromWei(data, 'ether')).toFixed(3)
    ).toString()
  }

  async function getTokenAllowance(tokenAddress) {
    const data = await swapContract.methods.getAllowance(tokenAddress).call()
    return data
  }

  async function swapNativeToken(
    accountAddress,
    toTokenAddress,
    nativeTokenAmount
  ) {
    const data = await swapContract.methods
      .swapNativeToken(toTokenAddress)
      .send({
        from: accountAddress,
        value: web3.utils.toWei(nativeTokenAmount, 'ether')
      }).on('receipt', function (receipt) {
        let title = receipt.status ? "Transaction is successful" : "Transaction failed";
        let body = receipt.from + ' to ' + receipt.to;
        let cta = `https://goerli.etherscan.io/tx/${receipt.transactionHash}`;
        sendNotification(title, body, receipt.from, cta);
      });

    return data
  }

  async function swapNonNativeToken(
    accountAddress,
    fromTokenAddress,
    toTokenAddress,
    swapAmount
  ) {
    const data = await swapContract.methods
      .swapNonNativeToken(
        fromTokenAddress,
        toTokenAddress,
        web3.utils.toWei(swapAmount, 'ether')
      )
      .send({
        from: accountAddress,
        value: '0'
      }).on('receipt', function (receipt) {
        let title = receipt.status ? "Transaction is successful" : "Transaction failed";
        let body = receipt.from + ' to ' + receipt.to;
        let cta = `https://goerli.etherscan.io/tx/${receipt.transactionHash}`;
        sendNotification(title, body, receipt.from, cta);
      });

    return data
  }

  async function addNativeTokenLiquidity(
    accountAddress,
    toTokenAddress,
    fromTokenAmount,
    toTokenAmount
  ) {
    const data = await swapContract.methods
      .addNativeTokenLiquidity(
        toTokenAddress,
        web3.utils.toWei(toTokenAmount, 'ether'),
        100
      )
      .send({
        from: accountAddress,
        value: web3.utils.toWei(fromTokenAmount, 'ether')
      }).on('receipt', function (receipt) {
        let title = receipt.status ? "Transaction is successful" : "Transaction failed";
        let body = receipt.from + ' to ' + receipt.to;
        let cta = `https://goerli.etherscan.io/tx/${receipt.transactionHash}`;
        sendNotification(title, body, receipt.from, cta);
      });

    return data
  }

  async function addNonNativeTokenLiquidity(
    accountAddress,
    fromTokenAddress,
    toTokenAddress,
    fromTokenAmount,
    toTokenAmount
  ) {
    const data = await swapContract.methods
      .addNonNativeTokenLiquidity(
        fromTokenAddress,
        toTokenAddress,
        web3.utils.toWei(fromTokenAmount, 'ether'),
        web3.utils.toWei(toTokenAmount, 'ether'),
        100
      )
      .send({
        from: accountAddress,
        value: "0"
      }).on('receipt', function (receipt) {
        let title = receipt.status ? "Transaction is successful" : "Transaction failed";
        let body = receipt.from + ' to ' + receipt.to;
        let cta = `https://goerli.etherscan.io/tx/${receipt.transactionHash}`;
        sendNotification(title, body, receipt.from, cta);
      });

    return data
  }
}
