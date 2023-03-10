import { useMetaMask } from "metamask-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import LotteryApp from "./pages/Lottery/Lottery";
import SwapApp from "./pages/Swap";
import WrapApp from "./pages/Wrap";
import LiquidityApp from "./pages/Liquidity";
import NotificationsPage from "./pages/notifications";

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
                chainId={chainId}
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
                chainId={chainId}
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
                chainId={chainId}
              />
            }
          />
          <Route path='/liquidity' element={<LiquidityApp
            status={status}
            connect={connect}
            account={account}
            ethereum={ethereum}
            chainId={chainId}
          />} />
          <Route path='/notifications' element={<NotificationsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
