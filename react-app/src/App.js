import { useMetaMask } from "metamask-react";
import NavigationBar from "./components/NavigationBar";
import SwapApp from "./SwapApp";

export default function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  return (
    <div className="flex flex-col">
      <NavigationBar
        status={status}
        connect={connect}
        chainId={chainId}
        account={account}
      />
      <SwapApp
        status={status}
        connect={connect}
        account={account}
        ethereum={ethereum}
      />
    </div>
  );
}
