import { useMetaMask } from "metamask-react";
import ConnectWalletButton from "./components/ConnectWalletButton";
import SwapApp from "./SwapApp";

export default function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mr-4 mt-4">
        <ConnectWalletButton
          status={status}
          connect={connect}
          account={account}
          chainId={chainId}
        />
      </div>
      <SwapApp
        status={status}
        connect={connect}
        account={account}
        ethereum={ethereum}
      />
    </div>
  );
}
