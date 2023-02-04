import ConnectWalletButton from "./components/ConnectWalletButton";
import TokenSelectDropDown from "./components/TokenSelectDropDown";
import fileCoinLogo from "./assets/filcoin_logo.svg";
import TokenQuantityInput from "./components/TokenQuantityInput";
import TokenQtyValueView from "./components/TokenQtyValueView";
import { useState } from "react";
import OptinBanner from "./components/push/NotificationOptinBanner";
import makeSwapContract from "./swap";

function App() {
  const [qty, setQty] = useState("");
  var swapContract;
  return (
    <div>
      <div className="flex justify-end mr-4 mt-4">
        <ConnectWalletButton
          onProvider={async (provider, account) => {
            swapContract = makeSwapContract(
              provider,
              swapABI.abi,
              swapABI.address
            );
            // const data = await swapContract.methods
            //   .getAllowance(dai.address)
            //   .call();
            const web3 = new Web3(provider);

            // const data = await swapContract.methods
            //   .swapNativeToken("0x15d471748c0ec3255C1f17158729C989CAe0688E")
            //   .send({
            //     from: account,
            //     value: "100000000000000",
            //   });

            const data = await swapContract.methods
              .swapNonNativeToken(
                "0x15d471748c0ec3255C1f17158729C989CAe0688E", // TT1
                "0x8D9Cf8B58fcF00Ead8550459778EBd8F188951E4", // TT2
                "10000000000000"
              )
              .send({
                from: account,
                value: "0",
              });

            // const data = web3.eth.abi.encodeFunctionSignature({
            //   inputs: [
            //     {
            //       internalType: "address",
            //       name: "tokenOutAddress",
            //       type: "address",
            //     },
            //   ],
            //   name: "swapNativeToken",
            //   outputs: [
            //     {
            //       internalType: "uint256",
            //       name: "swapAmount",
            //       type: "uint256",
            //     },
            //   ],
            //   stateMutability: "payable",
            //   type: "function",
            // });

            // const res = await web3.eth.sendTransaction({
            //   from: account,
            //   to: swapABI.address,
            //   data: data,
            //   value: "100000000000000",
            // });

            //console.log(data);

            // if (data <= 0) {
            // const daiContract = makeSwapContract(
            //   provider,
            //   dai.abi,
            //   "0x15d471748c0ec3255C1f17158729C989CAe0688E"
            // );

            // const res = await daiContract.methods
            //   .approve(swapABI.address, "10000000000000")
            //   .send({
            //     from: account,
            //     value: 0,
            //   });
            // console.log(res);
            // }

            // TODO(someshubham): Call getAllowance for a token from Swap Contract
            // If allowance is zero, then get the token smart contract and call the approve function
            // of the contract
            // two params: spender, amount: "Swap Contract Address", 10000000000000000000000000000

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
