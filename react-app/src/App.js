import "./App.css";
import ConnectWalletButton from "./components/ConnectWalletButton";
import TokenSelectDropDown from "./components/TokenSelectDropDown";
import fileCoinLogo from "./assets/filcoin_logo.svg";

function App() {
  return (
    <div>
      <div className="flex justify-end mr-4 mt-4">
        <ConnectWalletButton />
      </div>
      <div className="flex justify-start flex-col m-8 bg-slight-black text-grey-font rounded p-4">
        <div>You send</div>
        <div className="flex justify-start">
          <TokenSelectDropDown
            tokenName="FIL"
            tokenBalance="11112.23"
            tokenLogo={fileCoinLogo}
          />
          <input type="number" name="" id="" />
        </div>
      </div>
    </div>
  );
}

export default App;
