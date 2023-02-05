import { useMetaMask } from "metamask-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import LotteryApp from "./pages/Lottery/Lottery";
import SwapApp from "./pages/Swap";
import WrapApp from "./pages/Wrap";

export default function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <NavigationBar
          status={status}
          connect={connect}
          chainId={chainId}
          account={account}
        />
        <Routes>
          <Route
            path="/"
            element={
              <SwapApp
                status={status}
                connect={connect}
                account={account}
                ethereum={ethereum}
              />
            }
          />
          <Route
            path="/wrap"
            element={
              <WrapApp
                status={status}
                connect={connect}
                account={account}
                ethereum={ethereum}
              />
            }
          />
          <Route
            path="/lottery"
            element={
              <LotteryApp
                status={status}
                connect={connect}
                account={account}
                ethereum={ethereum}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
