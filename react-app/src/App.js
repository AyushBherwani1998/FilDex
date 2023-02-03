import ConnectWalletButton from "./components/ConnectWalletButton";
import TokenSelectDropDown from "./components/TokenSelectDropDown";
import fileCoinLogo from "./assets/filcoin_logo.svg";
import TokenQuantityInput from "./components/TokenQuantityInput";
import TokenQtyValueView from "./components/TokenQtyValueView";
import { useState } from "react";
import OptinBanner from "./components/push/NotificationOptinBanner";

function App() {
  const [qty, setQty] = useState("");
  var swapContract;
  return (
    <div>
      <div className="flex justify-end mr-4 mt-4">
        <ConnectWalletButton
          onProvider={async (provider) => {
            swapContract = makeSwapContract(provider);
            const data = await swapContract.methods
              .getAllowance("0xdc31ee1784292379fbb2964b3b9c4124d8f89c60")
              .call();
            console.log(data);
          }}
        />
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex justify-start flex-col m-8 bg-slight-black text-grey-font rounded-lg p-4">
          <div className="text-sm mb-6">You send</div>
          <div className="flex justify-start">
            <TokenSelectDropDown
              tokenName="FIL"
              tokenBalance="11112.23"
              tokenLogo={fileCoinLogo}
            />
            <div className="ml-2" />
            <TokenQuantityInput onInput={setQty} />
          </div>
          <div className="mb-8" />
          <hr className="border-divider-dark border" />
          <div className="mb-4" />
          <div className="text-sm mb-6">You receive</div>
          <div className="flex justify-start">
            <TokenSelectDropDown />
            <div className="ml-2" />
            <TokenQtyValueView tokenQuantity="12.23" tokenPrice="0.00" />
          </div>
          <div className="mb-4" />
        </div>
      </div>
      <div className="flex justify-center">
        <button className="rounded-full bg-white px-20 py-3 text-xl">
          Swap
        </button>
        <div className="text-white">{qty}</div>
      </div>
    </div>
  );
}

export default App;
