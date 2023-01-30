import "./App.css";
import ConnectWalletButton from "./components/ConnectWalletButton";
import TokenSelectDropDown from "./components/TokenSelectDropDown";
import fileCoinLogo from "./assets/filcoin_logo.svg";
import TokenQuantityInput from "./components/TokenQuantityInput";
import TokenQtyValueView from "./components/TokenQtyValueView";

function App() {
  return (
    <div>
      <div className="flex justify-end mr-4 mt-4">
        <ConnectWalletButton />
      </div>
      <div className="w-500 md:w-70% flex justify-start flex-col m-8 bg-slight-black text-grey-font rounded-lg p-4">
        <div className="text-sm mb-6">You send</div>
        <div className="flex justify-start">
          <TokenSelectDropDown
            tokenName="FIL"
            tokenBalance="11112.23"
            tokenLogo={fileCoinLogo}
          />
          <div className="ml-2" />
          <TokenQuantityInput />
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
  );
}

export default App;
