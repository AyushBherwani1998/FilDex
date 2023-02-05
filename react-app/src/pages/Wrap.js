import ConnectWalletButton from "../components/ConnectWalletButton";
import TokenSelectDropDown from "../components/TokenSelectDropDown";
import fileCoinLogo from "../assets/filcoin_logo.svg";
import swapLogo from "../assets/swap.svg";
import TokenQuantityInput from "../components/TokenQuantityInput";
import TokenQtyValueView from "../components/TokenQtyValueView";
import { useState, useEffect } from "react";
import makeContract from "../utils/makeContract";
import werc20Abi from "../abi/WERC20ABI";
import Web3 from "web3";

function WrapApp({ status, connect, account, ethereum }) {
  const [qty, setQty] = useState("");

  const [web3, setWeb3] = useState(null);
  const [tokenInSymbol, setTokenInSymbol] = useState("TFIL");
  const [tokenOutSymbol, setTokenOutSymbol] = useState("WTFIL");
  const [isLoading, setLoading] = useState(false);
  const [isSwapSuccess, setIsSwapSuccess] = useState(false);

  useEffect(() => {
    if (ethereum !== null && web3 === null) {
      setWeb3(new Web3(ethereum));

      return;
    }
  }, [ethereum, web3]);

  function swapIcons() {
    const symbol = tokenInSymbol;
    setTokenInSymbol(tokenOutSymbol);
    setTokenOutSymbol(symbol);
  }

  async function wrapperSwap() {
    if (status === "connected") {
      let intQty = parseInt(qty);
      const wtFilContract = makeContract(ethereum, werc20Abi.abi, werc20Abi.wtFilAddress);

      if (isNaN(intQty)) {
        alert("Please enter input!")
      } else {
        const weiQty = web3.utils.toWei(qty, "ether");
        var tx;
        if (tokenInSymbol === "TFIL") {
          tx = await wtFilContract.methods.deposit().send({
            value: weiQty,
            from: account,
          });
        } else {
          tx = await wtFilContract.methods.withdraw(weiQty).send({
            from: account,
          });
        }
        console.log(tx);
      }
    } else if (status === "notConnected") {
      connect();
    }
  }

  return (
    <div>
      <div className="flex justify-end mr-4 mt-4">
        <ConnectWalletButton />
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex justify-start flex-col m-8 bg-slight-black text-grey-font rounded-lg p-4">
          <div className="text-sm mb-6">You send</div>
          <div className="flex justify-start">
            <TokenSelectDropDown
              tokenName={tokenInSymbol}
              tokenBalance="11112.23"
              tokenLogo={fileCoinLogo}
            />
            <div className="ml-2" />
            <TokenQuantityInput onInput={setQty} />
          </div>
          <div className="mb-8" />
          <div className="flex justify-center" onClick={swapIcons}>
            {swapLogo != null ? (
              <img src={swapLogo} alt="F" />
            ) : (
                <div className="p-4 border border-dashed rounded-full bg-placeholder-dark-text"></div>
              )}
          </div>
          <div className="mb-4" />
          <div className="text-sm mb-6">You receive</div>
          <div className="flex justify-start">
            <TokenSelectDropDown
              tokenName={tokenOutSymbol}
              tokenBalance="11112.23"
              tokenLogo={fileCoinLogo}
            />
            <div className="ml-2" />
            <TokenQtyValueView tokenQuantity={qty} tokenPrice="0.00" />
          </div>
          <div className="mb-4" />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          class="rounded-full bg-white px-20 py-3 text-xl"
          onClick={wrapperSwap}
        >Swap
        </button>
      </div>
    </div>
  );
}

export default WrapApp;
